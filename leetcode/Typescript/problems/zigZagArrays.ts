// Problem: zigZagArrays
// export type ZigZagArraysTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };
// 2个数 length 3
// 2
// 3个数 length 3
// 分以下情况
// 1. 先取两个，3 * 2 = 6
// 2. 取三个，最大最小的放中间
//   a. 最大放中间 2
//   b. 最小放中间 2
// 一共 6 + 2 + 2 = 10

// // 以n = 3, count = 3
// // 需要迭代 length 范围 [1, n]
// // 当length = 1时
// up = [1,1,1];
// down = [1,1,1];
// // 当length = 2时，根据length = 1的结果继续迭代
// up = [0, 1, 2];
// down = [2, 1, 0];
// // 当length = 3时，根据length = 2的结果继续迭代
// up = [0, 2, 3];
// down = [3, 2, 0];

// 1) Source code
export const zigZagArrays = (n: number, l: number, r: number): number => {
  const MOD = 1e9 + 7;
  let result = 0;
  let count = r - l + 1;
  // 直接算出n = 2的时候, 已知题目中n肯定大于2
  let up = Array.from({ length: count }, (_, i) => i);
  let down = Array.from({ length: count }, (_, i) => count - 1 - i);
  const newUp = new Array(count).fill(0);
  const newDown = new Array(count).fill(0);

  for (let length = 3; length <= n; length++) {
    // 计算down的前缀和
    const prefixSumDown = new Array(count).fill(0);
    prefixSumDown[0] = down[0];
    for (let i = 1; i < count; i++) {
      prefixSumDown[i] = (prefixSumDown[i - 1] + down[i]) % MOD;
    }
    // 计算up的后缀和
    const suffixSumUp = new Array(count).fill(0);
    suffixSumUp[count - 1] = up[count - 1];
    for (let i = count - 2; i >= 0; i--) {
      suffixSumUp[i] = (suffixSumUp[i + 1] + up[i]) % MOD;
    }
    for (let i = 0; i < count; i++) {

      // new up 取所有小于当前index的down数组的和，直接跳过第一个
      if (i > 0) {
        newUp[i] = prefixSumDown[i - 1];
      }
      // new down 取所有大于当前index的up数组的和，跳过最后一个
      if (i < count - 1) {
        newDown[i] = suffixSumUp[i + 1];
      }
    }
    // 全部计算完了之后，丢掉前面的
    up = newUp;
    down = newDown;
  }
  for (let i = 0; i < count; i++) {
    result = (result + up[i] + down[i]) % MOD;
  }

  return result;
};

console.log(zigZagArrays(10, 6, 93));

// 2) Configure test parameters
// export const zigZagArraysTestCases: ZigZagArraysTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runZigZagArrays = (
//   testCase: ZigZagArraysTestCase = zigZagArraysTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = zigZagArrays(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
