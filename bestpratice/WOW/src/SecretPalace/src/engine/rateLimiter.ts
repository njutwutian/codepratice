export const createRateLimiter = (
  ratePerSecond: number
): {
  waitTurn: () => Promise<void>;
} => {
  const safeRate = Math.max(1, ratePerSecond || 1);
  const intervalMs = 1000 / safeRate;
  let nextAvailableAt = Date.now();

  const waitTurn = (): Promise<void> => {
    return new Promise((resolve) => {
      const now = Date.now();
      const scheduledAt = Math.max(now, nextAvailableAt);
      const delay = Math.max(0, scheduledAt - now);
      nextAvailableAt = scheduledAt + intervalMs;

      setTimeout(resolve, delay);
    });
  };

  return {
    waitTurn
  };
};
