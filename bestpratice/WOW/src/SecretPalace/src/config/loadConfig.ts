import fs from "fs";
import nodeConfig from "config";

import { resolveFromCwd } from "../utils/paths";
import {
  GeneratorConfig,
  LoadConfigResult,
  NormalizedConfig,
  ReportConfig,
  RunConfig,
  StorageConfig,
  TargetConfig
} from "../types";

const ensureNumber = (value: unknown, fallback: number): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return fallback;
};

const normalizeConfig = (rawConfig: Record<string, unknown>): NormalizedConfig => {
  const target = (rawConfig.target as Record<string, unknown>) || {};
  const run = (rawConfig.run as Record<string, unknown>) || {};
  const generator = (rawConfig.generator as Record<string, unknown>) || {};
  const report = (rawConfig.report as Record<string, unknown>) || {};
  const storage = (rawConfig.storage as Record<string, unknown>) || {};

  const normalizedTarget: TargetConfig = {
    url: (target.url as string) || "http://localhost:8080/api/v1/events",
    method: String(target.method || "POST").toUpperCase(),
    headers: (target.headers as Record<string, string>) || {
      "content-type": "application/json"
    },
    timeoutMs: ensureNumber(target.timeoutMs, 5000)
  };

  const normalizedRun: RunConfig = {
    durationMs: ensureNumber(run.durationMs, 300000),
    ratePerSecond: Math.max(1, ensureNumber(run.ratePerSecond, 50)),
    quota: Math.max(1, ensureNumber(run.quota, 100000)),
    maxConcurrency: Math.min(1000, Math.max(1, ensureNumber(run.maxConcurrency, 1000))),
    concurrency: Math.max(1, ensureNumber(run.concurrency, 2)),
    maxRetries: Math.max(0, ensureNumber(run.maxRetries, 2)),
    retryBaseDelayMs: Math.max(1, ensureNumber(run.retryBaseDelayMs, 200)),
    seed: ensureNumber(run.seed, Date.now()),
    requestTimeoutMs: Math.max(1, ensureNumber(run.requestTimeoutMs, 5000))
  };

  normalizedRun.concurrency = Math.min(normalizedRun.concurrency, normalizedRun.maxConcurrency);

  const normalizedGenerator: GeneratorConfig = {
    templatePath: (generator.templatePath as string) || "templates/event-template.json",
    strategies: (generator.strategies as GeneratorConfig["strategies"]) || {},
    staticFields: (generator.staticFields as GeneratorConfig["staticFields"]) || {}
  };

  const normalizedStorage: StorageConfig = {
    failedEventsPath:
      (storage.failedEventsPath as string) || "failures/failed-events.jsonl"
  };

  const normalizedReport: ReportConfig = {
    outputDir: (report.outputDir as string) || "reports"
  };

  return {
    target: normalizedTarget,
    run: normalizedRun,
    generator: normalizedGenerator,
    storage: normalizedStorage,
    report: normalizedReport
  };
};

export const loadConfig = (configPath?: string): Promise<LoadConfigResult> => {
  if (configPath) {
    const absolutePath = resolveFromCwd(configPath);

    return fs.promises
      .readFile(absolutePath, "utf8")
      .then((raw) => {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const normalized = normalizeConfig(parsed);

        return {
          path: absolutePath,
          config: normalized
        };
      })
      .catch((error: Error) => {
        const wrappedError = new Error("Failed to load config: " + error.message);
        (wrappedError as Error & { cause?: Error }).cause = error;
        throw wrappedError;
      });
  }

  return Promise.resolve()
    .then(() => {
      const parsed = nodeConfig.util.toObject() as Record<string, unknown>;
      const normalized = normalizeConfig(parsed);
      const environment = String(nodeConfig.util.getEnv("NODE_ENV") || "development");

      return {
        path: "node-config(" + environment + ")",
        config: normalized
      };
    })
    .catch((error: Error) => {
      const wrappedError = new Error("Failed to load config: " + error.message);
      (wrappedError as Error & { cause?: Error }).cause = error;
      throw wrappedError;
    });
};
