import { loadConfig } from "./config/loadConfig";
import { createSendEngine } from "./engine/sendEngine";
import { createDataGenerator } from "./generator/dataGenerator";
import { createMetrics } from "./report/metrics";
import { writeReport } from "./report/reportWriter";
import { createFailureStore } from "./storage/failureStore";
import {
  ReplaySimulationOptions,
  RunSimulationOptions,
  SendEngineResult
} from "./types";

export const runSimulation = (options: RunSimulationOptions): Promise<unknown> => {
  return loadConfig(options.configPath).then(({ config, path: configFilePath }) => {
    const metrics = createMetrics();
    const failureStore = createFailureStore(config.storage.failedEventsPath);

    return createDataGenerator(config.generator, config.run).then(
      (generator): Promise<unknown> | unknown => {
      if (options.dryRun) {
        const previewCount = Math.max(1, Number(options.previewCount || 3));
        const samples: unknown[] = [];

        for (let i = 0; i < previewCount; i += 1) {
          samples.push(generator.generate());
        }

        return {
          mode: "dry-run",
          configFilePath,
          previewCount,
          samples
        };
      }

      const engine = createSendEngine(config, metrics, failureStore);

      return engine
        .run(generator, {
          concurrencyController: options.concurrencyController,
          onProgress: options.onProgress
        })
        .then((engineResult: SendEngineResult) => {
        const summary = metrics.summarize();
        return writeReport(summary, config.report.outputDir, options.reportPath).then(
          (reportPath) => {
            return {
              mode: "run",
              configFilePath,
              reportPath,
              failurePath: failureStore.path,
              engineResult,
              summary
            };
          }
        );
        });
      }
    );
  });
};

export const replaySimulation = (options: ReplaySimulationOptions): Promise<unknown> => {
  return loadConfig(options.configPath).then(({ config, path: configFilePath }) => {
    const metrics = createMetrics();
    const failureStore = createFailureStore(config.storage.failedEventsPath);

    return createDataGenerator(config.generator, config.run).then((generator) => {
      return failureStore.loadReplayEvents(options.inputPath).then((events) => {
        const engine = createSendEngine(config, metrics, failureStore);

        return engine
          .run(generator, {
            replayEvents: events,
            onProgress: options.onProgress
          })
          .then((engineResult) => {
          const summary = metrics.summarize();
          return writeReport(summary, config.report.outputDir, options.reportPath).then(
            (reportPath) => {
              return {
                mode: "replay",
                configFilePath,
                reportPath,
                failurePath: failureStore.path,
                replayInputPath: options.inputPath || failureStore.path,
                replayCount: events.length,
                engineResult,
                summary
              };
            }
          );
          });
      });
    });
  });
};
