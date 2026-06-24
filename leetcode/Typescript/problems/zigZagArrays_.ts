export const zigZagArrays = (n: number, l: number, r: number): number => {
  const MOD = 1e9 + 7;
  const count = r - l + 1;

  // 边界情况（防御性）
  if (n === 1) return count % MOD;
  if (count === 1) return 0;

  // 初始化长度为 2
  let up = Array.from({ length: count }, (_, i) => i % MOD);
  let down = Array.from({ length: count }, (_, i) => (count - 1 - i) % MOD);

  for (let length = 3; length <= n; length++) {
    // 每次循环重新创建新数组，确保隔离和清零
    const newUp = new Array(count).fill(0);
    const newDown = new Array(count).fill(0);

    // 计算 down 的前缀和
    const prefixDown = new Array(count);
    prefixDown[0] = down[0];
    for (let i = 1; i < count; i++) {
      prefixDown[i] = (prefixDown[i - 1] + down[i]) % MOD;
    }

    // 计算 up 的后缀和
    const suffixUp = new Array(count);
    suffixUp[count - 1] = up[count - 1];
    for (let i = count - 2; i >= 0; i--) {
      suffixUp[i] = (suffixUp[i + 1] + up[i]) % MOD;
    }

    for (let i = 0; i < count; i++) {
      // 上升：前面比 i 小的 down 之和
      if (i > 0) {
        newUp[i] = prefixDown[i - 1];
      }
      // 下降：后面比 i 大的 up 之和
      if (i < count - 1) {
        newDown[i] = suffixUp[i + 1];
      }
      // 若 i == 0，newUp[i] 保持 0；若 i == count-1，newDown[i] 保持 0
    }

    // 丢弃旧数据，更新状态
    up = newUp;
    down = newDown;
  }

  let result = 0;
  for (let i = 0; i < count; i++) {
    result = (result + up[i] + down[i]) % MOD;
  }
  return result;
};