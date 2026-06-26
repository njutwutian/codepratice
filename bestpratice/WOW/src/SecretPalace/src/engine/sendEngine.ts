import { createHttpClient } from "./httpClient";
import { createRateLimiter } from "./rateLimiter";
import { executeWithRetry } from "./retry";
import {
  ConcurrencyController,
  DataGenerator,
  FailureStore,
  JsonObject,
  Metrics,
  NormalizedConfig,
  ProgressSnapshot,
  RetryableError,
  SendEngine
} from "../types";

const computeTotalEvents = (
  durationMs: number,
  ratePerSecond: number,
  quota: number
): number => {
  const total = Math.floor((durationMs / 1000) * ratePerSecond);
  const bounded = Math.min(total, Math.max(1, quota));
  return Math.max(1, bounded);
};

export const createSendEngine = (
  config: NormalizedConfig,
  metrics: Metrics,
  failureStore: FailureStore
): SendEngine => {
  const limiter = createRateLimiter(config.run.ratePerSecond);
  const client = createHttpClient(config.target, config.run);

  const run = (
    dataGenerator: DataGenerator,
    options?: {
      replayEvents?: JsonObject[];
      concurrencyController?: ConcurrencyController;
      onProgress?: (progress: ProgressSnapshot) => void;
    }
  ): Promise<{ totalEvents: number; replayMode: boolean }> => {
    const replayEvents = options && Array.isArray(options.replayEvents) ? options.replayEvents : null;
    const totalEvents = replayEvents
      ? replayEvents.length
      : computeTotalEvents(config.run.durationMs, config.run.ratePerSecond, config.run.quota);
    const getDesiredConcurrency = (): number => {
      if (options?.concurrencyController?.isPaused()) {
        return 0;
      }

      const dynamicValue = options?.concurrencyController
        ? options.concurrencyController.getConcurrency()
        : config.run.concurrency;
      const bounded = Math.max(1, Math.min(config.run.maxConcurrency, dynamicValue || 1));
      return bounded;
    };

    let index = 0;
    let active = 0;
    let done = false;
    let schedulerTimer: NodeJS.Timeout | null = null;
    let lastProgressAt = 0;

    const emitProgress = (force?: boolean): void => {
      if (!options?.onProgress) {
        return;
      }

      const now = Date.now();
      if (!force && now - lastProgressAt < 200) {
        return;
      }

      const summary = metrics.summarize();
      const completed = summary.total;
      const percent = totalEvents <= 0 ? 100 : Math.min(100, Number(((completed / totalEvents) * 100).toFixed(2)));
      const currentConcurrency = options?.concurrencyController
        ? options.concurrencyController.getConcurrency()
        : config.run.concurrency;
      const paused = options?.concurrencyController?.isPaused() || false;

      options.onProgress({
        totalEvents,
        dispatchedCount: Math.min(index, totalEvents),
        completedCount: completed,
        successCount: summary.successCount,
        failureCount: summary.failureCount,
        activeWorkers: active,
        elapsedMs: summary.durationMs,
        throughputPerSecond: summary.throughputPerSecond,
        percent,
        paused,
        concurrency: currentConcurrency
      });

      lastProgressAt = now;
    };

    const getNextIndex = (): number | null => {
      if (index >= totalEvents) {
        return null;
      }

      const current = index;
      index += 1;
      return current;
    };

    const processOne = (currentIndex: number): Promise<void> => {
      const payload = replayEvents ? replayEvents[currentIndex] : dataGenerator.generate();
      const startedAt = Date.now();

      return limiter
        .waitTurn()
        .then(() => {
          return executeWithRetry(
            () => {
              return client.send(payload);
            },
            {
              maxRetries: config.run.maxRetries,
              baseDelayMs: config.run.retryBaseDelayMs
            }
          );
        })
        .then(() => {
          metrics.markSuccess(Date.now() - startedAt);
        })
        .catch((error: RetryableError) => {
          metrics.markFailure(Date.now() - startedAt, error);

          return failureStore.append({
            failedAt: new Date().toISOString(),
            attempts: error.attempts || config.run.maxRetries + 1,
            error: {
              message: error.message,
              status: error.status || null,
              code: error.code,
              retryable: error.retryable !== false
            },
            payload
          });
        })
        .then(() => undefined);
    };

    const schedule = (): void => {
      if (done) {
        return;
      }

      const target = getDesiredConcurrency();

      while (active < target) {
        const currentIndex = getNextIndex();
        if (currentIndex === null) {
          break;
        }

        active += 1;
        processOne(currentIndex)
          .finally(() => {
            active -= 1;
            emitProgress();
            schedule();
          })
          .catch(() => undefined);
      }
    };

    return new Promise((resolve) => {
      const finalizeIfDone = (): void => {
        if (done) {
          return;
        }

        if (index >= totalEvents && active === 0) {
          done = true;
          emitProgress(true);
          if (schedulerTimer) {
            clearInterval(schedulerTimer);
            schedulerTimer = null;
          }
          resolve({
            totalEvents,
            replayMode: Boolean(replayEvents)
          });
        }
      };

      schedulerTimer = setInterval(() => {
        schedule();
        emitProgress();
        finalizeIfDone();
      }, 100);

      schedule();
      emitProgress(true);
      finalizeIfDone();
    });
  };

  return {
    run
  };
};
