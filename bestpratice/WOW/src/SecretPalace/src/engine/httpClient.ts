import { JsonObject, RetryableError, RunConfig, TargetConfig } from "../types";

type ApiEnvelope = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: unknown;
};

const classifyStatusRetryable = (status: number): boolean => {
  return status === 429 || status >= 500;
};

export const createHttpClient = (
  targetConfig: TargetConfig,
  runConfig: RunConfig
): {
  send: (payload: JsonObject) => Promise<{ status: number; body: string }>;
} => {
  const send = (payload: JsonObject): Promise<{ status: number; body: string }> => {
    const controller = new AbortController();
    const timeoutMs = runConfig.requestTimeoutMs || targetConfig.timeoutMs || 5000;
    const timer = setTimeout(() => {
      controller.abort("Request timeout");
    }, timeoutMs);

    return fetch(targetConfig.url, {
      method: targetConfig.method,
      headers: targetConfig.headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    })
      .then((response) => {
        return response.text().then((rawBody) => {
          let envelope: ApiEnvelope | null = null;
          try {
            envelope = rawBody ? (JSON.parse(rawBody) as ApiEnvelope) : null;
          } catch (_error) {
            envelope = null;
          }

          if (response.ok && (!envelope || envelope.success !== false)) {
            return {
              status: response.status,
              body: rawBody
            };
          }

          const error = new Error(
            (envelope?.message as string) ||
              (rawBody || "HTTP " + response.status + " Request failed")
          ) as RetryableError;
          error.status = response.status;
          error.code = envelope?.code || undefined;
          error.retryable = classifyStatusRetryable(response.status);
          throw error;
        });
      })
      .catch((error: RetryableError) => {
        if (typeof error.retryable !== "boolean") {
          error.retryable = true;
        }
        throw error;
      })
      .finally(() => {
        clearTimeout(timer);
      });
  };

  return {
    send
  };
};
