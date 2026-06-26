#!/usr/bin/env node
import readline from "readline";

import { loadConfig } from "./config/loadConfig";
import { replaySimulation, runSimulation } from "./index";
import { ConcurrencyController, ProgressSnapshot } from "./types";

type ParsedArgs = {
  _: string[];
  [key: string]: string | boolean | string[];
};

const parseArgs = (argv: string[]): ParsedArgs => {
  return argv.reduce(
    (acc, token, index) => {
      if (token.startsWith("--")) {
        const key = token.slice(2);
        const next = argv[index + 1];
        if (!next || next.startsWith("--")) {
          acc[key] = true;
        } else {
          acc[key] = next;
        }
      } else if (!argv[index - 1] || !argv[index - 1].startsWith("--")) {
        acc._.push(token);
      }

      return acc;
    },
    { _: [] } as ParsedArgs
  );
};

const printUsage = (): void => {
  console.log("SecretPalace CLI usage:");
  console.log(
    "  node dist/cli.js run [--config config/custom.json] [--dry-run] [--report reports/out.json]"
  );
  console.log("  可选: --no-interactive 关闭运行中方向键并发调节");
  console.log(
    "  node dist/cli.js replay [--config config/custom.json] [--input failures/failed-events.jsonl]"
  );
  console.log("  运行中可用方向键动态调整并发：上/下(LogN步进), 左/右(每步-50/+50), P暂停/恢复");
  console.log("  未传 --config 时默认使用 node-config 分层配置(config/default.json + config/{NODE_ENV}.json)");
};

const clampConcurrency = (value: number, maxConcurrency: number): number => {
  return Math.min(maxConcurrency, Math.max(1, Math.floor(value)));
};

const logStep = (current: number): number => {
  const safeCurrent = Math.max(2, current);
  return Math.max(1, 2 ** Math.max(0, Math.floor(Math.log2(safeCurrent)) - 1));
};

const createConcurrencyController = (
  initialConcurrency: number,
  maxConcurrency: number
): ConcurrencyController => {
  let current = clampConcurrency(initialConcurrency, maxConcurrency);
  let paused = false;

  return {
    maxConcurrency,
    getConcurrency: (): number => current,
    setConcurrency: (next: number): number => {
      current = clampConcurrency(next, maxConcurrency);
      return current;
    },
    isPaused: (): boolean => paused,
    setPaused: (nextPaused: boolean): boolean => {
      paused = Boolean(nextPaused);
      return paused;
    },
    togglePaused: (): boolean => {
      paused = !paused;
      return paused;
    }
  };
};

const setupInteractiveConcurrencyControl = (
  controller: ConcurrencyController,
  enabled: boolean
): (() => void) => {
  if (!enabled || !process.stdin.isTTY) {
    return () => undefined;
  }

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  console.log(
    "并发控制已启用: ↑/↓ LogN大步进, ←/→ 每步-50/+50, P暂停/恢复, 当前=" +
      controller.getConcurrency() +
      ", 上限=" +
      controller.maxConcurrency
  );

  const APPLY_DELAY_MS = 2000;
  const MODIFY_COOLDOWN_MS = 5000;
  let lastModifyRequestAt = 0;
  let pendingApplyTimer: NodeJS.Timeout | null = null;

  const clearPendingTimer = (): void => {
    if (!pendingApplyTimer) {
      return;
    }
    clearTimeout(pendingApplyTimer);
    pendingApplyTimer = null;
  };

  const printControlMessage = (message: string): void => {
    process.stdout.write("\n" + message + "\n");
  };

  const scheduleConcurrencyChange = (next: number): void => {
    const now = Date.now();
    const sinceLast = now - lastModifyRequestAt;

    if (sinceLast < MODIFY_COOLDOWN_MS) {
      const waitSeconds = ((MODIFY_COOLDOWN_MS - sinceLast) / 1000).toFixed(1);
      printControlMessage("并发修改过于频繁，请在 " + waitSeconds + " 秒后再试");
      return;
    }

    lastModifyRequestAt = now;
    clearPendingTimer();

    printControlMessage(
      "并发修改请求已接收，2秒后生效: " + controller.getConcurrency() + " -> " + next
    );

    pendingApplyTimer = setTimeout(() => {
      const adjusted = controller.setConcurrency(next);
      pendingApplyTimer = null;
      printControlMessage("并发已生效: " + adjusted);
    }, APPLY_DELAY_MS);
  };

  const onKeypress = (_: string, key: { name?: string; ctrl?: boolean }): void => {
    if (key && key.ctrl && key.name === "c") {
      process.stdin.off("keypress", onKeypress);
      clearPendingTimer();
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      process.exit(130);
      return;
    }

    const current = controller.getConcurrency();
    let next = current;

    if (key.name === "p") {
      const paused = controller.togglePaused();
      printControlMessage(paused ? "已暂停派发新请求" : "已恢复派发新请求");
      return;
    }

    if (key.name === "up") {
      next = current + logStep(current);
    } else if (key.name === "down") {
      next = current - logStep(current);
    } else if (key.name === "right") {
      next = current + 50;
    } else if (key.name === "left") {
      next = current - 50;
    }

    if (next !== current) {
      scheduleConcurrencyChange(next);
    }
  };

  process.stdin.on("keypress", onKeypress);

  return () => {
    process.stdin.off("keypress", onKeypress);
    clearPendingTimer();
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
  };
};

const formatMs = (value: number): string => {
  const seconds = Math.max(0, Math.floor(value / 1000));
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return mm + ":" + ss;
};

const padRight = (text: string, width: number): string => {
  if (text.length >= width) {
    return text;
  }
  return text + " ".repeat(width - text.length);
};

const createProgressUi = (enabled: boolean): {
  onProgress: (snapshot: ProgressSnapshot) => void;
  finish: () => void;
} => {
  let lastRenderLength = 0;
  let rendered = false;

  const render = (snapshot: ProgressSnapshot): void => {
    if (!enabled) {
      return;
    }

    const done = snapshot.completedCount;
    const total = snapshot.totalEvents;
    const percentText = String(snapshot.percent.toFixed(2)).padStart(6, " ") + "%";
    const status = snapshot.paused ? "PAUSED" : "RUNNING";
    const line =
      "进度 " +
      percentText +
      " | " +
      done +
      "/" +
      total +
      " | ok=" +
      snapshot.successCount +
      " fail=" +
      snapshot.failureCount +
      " | qps=" +
      snapshot.throughputPerSecond.toFixed(2) +
      " | active=" +
      snapshot.activeWorkers +
      " | conc=" +
      snapshot.concurrency +
      " | t=" +
      formatMs(snapshot.elapsedMs) +
      " | " +
      status;

    const padded = padRight(line, Math.max(lastRenderLength, line.length));
    process.stdout.write("\r" + padded);
    lastRenderLength = padded.length;
    rendered = true;
  };

  const finish = (): void => {
    if (!enabled || !rendered) {
      return;
    }
    process.stdout.write("\n");
  };

  return {
    onProgress: render,
    finish
  };
};

const main = (): Promise<void> => {
  const args = parseArgs(process.argv.slice(2));
  const command = (args._[0] || "run") as string;

  if (command === "run") {
    const configPath = args.config as string | undefined;
    const isDryRun = Boolean(args["dry-run"]);
    const interactiveEnabled = !isDryRun && !Boolean(args["no-interactive"]);

    return loadConfig(configPath).then(({ config }) => {
      const controller = createConcurrencyController(
        config.run.concurrency,
        config.run.maxConcurrency
      );

      const cleanup = setupInteractiveConcurrencyControl(controller, interactiveEnabled);
      const progressUi = createProgressUi(!isDryRun);

      return runSimulation({
        configPath,
        dryRun: isDryRun,
        previewCount: args.preview as string | number | undefined,
        reportPath: args.report as string | undefined,
        concurrencyController: controller,
        onProgress: progressUi.onProgress
      })
        .then((result) => {
          progressUi.finish();
          console.log(JSON.stringify(result, null, 2));
        })
        .finally(() => {
          progressUi.finish();
          cleanup();
        });
    });
  }

  if (command === "replay") {
    const progressUi = createProgressUi(true);
    return replaySimulation({
      configPath: args.config as string | undefined,
      inputPath: args.input as string | undefined,
      reportPath: args.report as string | undefined,
      onProgress: progressUi.onProgress
    })
      .then((result) => {
        progressUi.finish();
        console.log(JSON.stringify(result, null, 2));
      })
      .finally(() => {
        progressUi.finish();
      });
  }

  printUsage();
  return Promise.resolve();
};

main().catch((error: Error) => {
  console.error("SecretPalace CLI failed:", error.message);
  process.exitCode = 1;
});
