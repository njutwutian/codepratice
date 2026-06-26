export const createSeededRandom = (seedInput: number): (() => number) => {
  let seed = (seedInput >>> 0) || 123456789;

  return () => {
    seed = (1664525 * seed + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
};

export const randomInt = (rng: () => number, min: number, max: number): number => {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(rng() * (high - low + 1)) + low;
};

export const randomFloat = (
  rng: () => number,
  min: number,
  max: number,
  precision?: number
): number => {
  const value = rng() * (max - min) + min;
  const digits = Number.isInteger(precision) ? Number(precision) : 2;
  return Number(value.toFixed(digits));
};

export const randomUuidV4 = (rng: () => number): string => {
  const hex = "0123456789abcdef";
  const makeChar = (): string => hex[Math.floor(rng() * 16)];

  let uuid = "";
  for (let i = 0; i < 36; i += 1) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else if (i === 14) {
      uuid += "4";
    } else if (i === 19) {
      const variant = (Math.floor(rng() * 4) + 8).toString(16);
      uuid += variant;
    } else {
      uuid += makeChar();
    }
  }

  return uuid;
};
