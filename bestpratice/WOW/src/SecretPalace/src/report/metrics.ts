import { Metrics, MetricsSummary, RetryableError } from "../types";

export const createMetrics = (): Metrics => {
  const startedAt = Date.now();

  const state = {
    successCount: 0,
    failureCount: 0,
    totalLatencyMs: 0,
    errorBreakdown: {} as Record<string, number>
  };

  const markSuccess = (latencyMs: number): void => {
    state.successCount += 1;
    state.totalLatencyMs += latencyMs;
  };

  const markFailure = (latencyMs: number, error: RetryableError): void => {
    const reason = error?.code || String(error?.status || error?.message || "UnknownError");

    state.failureCount += 1;
    state.totalLatencyMs += latencyMs;
    state.errorBreakdown[reason] = (state.errorBreakdown[reason] || 0) + 1;
  };

  const summarize = (): MetricsSummary => {
    const endedAt = Date.now();
    const total = state.successCount + state.failureCount;
    const elapsedSeconds = Math.max(0.001, (endedAt - startedAt) / 1000);

    return {
      startedAt: new Date(startedAt).toISOString(),
      endedAt: new Date(endedAt).toISOString(),
      durationMs: endedAt - startedAt,
      total,
      successCount: state.successCount,
      failureCount: state.failureCount,
      successRate: total === 0 ? 0 : Number((state.successCount / total).toFixed(4)),
      throughputPerSecond: Number((total / elapsedSeconds).toFixed(2)),
      avgLatencyMs: total === 0 ? 0 : Number((state.totalLatencyMs / total).toFixed(2)),
      errorBreakdown: state.errorBreakdown
    };
  };

  return {
    markSuccess,
    markFailure,
    summarize
  };
};
