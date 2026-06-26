import { RetryableError } from "../types";

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const executeWithRetry = <T>(
  task: (attempt: number) => Promise<T>,
  options: { maxRetries: number; baseDelayMs: number }
): Promise<{ value: T; attempts: number }> => {
  const maxRetries = Math.max(0, options.maxRetries || 0);
  const baseDelayMs = Math.max(1, options.baseDelayMs || 100);

  const runAttempt = (attempt: number): Promise<{ value: T; attempts: number }> => {
    return task(attempt)
      .then((value) => {
        return {
          value,
          attempts: attempt
        };
      })
      .catch((error: RetryableError) => {
        const retryable = error.retryable !== false;
        const canRetry = retryable && attempt <= maxRetries;

        if (!canRetry) {
          error.attempts = attempt;
          throw error;
        }

        const delayMs = baseDelayMs * Math.pow(2, attempt - 1);
        return sleep(delayMs).then(() => runAttempt(attempt + 1));
      });
  };

  return runAttempt(1);
};
