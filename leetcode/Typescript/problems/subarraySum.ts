// Problem: subarraySum
// export type SubarraySumTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
// 核心思路，子数组是关键信息
// 子数组意味着连续
export const subarraySum = (nums: number[], k: number): number => {
  const currentSumMap = new Map<number, number>();
  let count = 0;
  currentSumMap.set(0, 1);
  let currentSum = 0;
  nums.forEach((value, index) => {
    currentSum += value;
    // 当前的和 - 目标 = 之前的和
    const target = currentSum - k;
    if (currentSumMap.has(target)) {
      count += currentSumMap.get(target) || 0;
    }
    currentSumMap.set(currentSum, (currentSumMap.get(currentSum) || 0) + 1);
  });
  return count;
};
// 暴力超时
// export const subarraySum = (nums: number[], k: number): number => {
//   const currentSumMap = new Map<number, number>();
//   let count = 0;
//   currentSumMap.set(0, 0);
//   nums.forEach((value, index) => {
//     const sum = (currentSumMap.get(index) || 0) + value;
//     currentSumMap.set(index + 1, sum);
//   });
//   for (let i = 0; i < nums.length + 1; i++) {
//     // 计算所有前缀和可能
//     // f(max) - f(i)
//     // 0-0 0-1 0-2 0-3
//     // 1-1 1-2 1-3
//     // 2-2 2-3
//     // 3-3
//     for (let j = i+1; j < nums.length + 1; j++) {
//       let sum = 0;
//       if (i === 0 && j === 0) {
//         continue;
//       }
//       const primary = currentSumMap.get(i) || 0;
//       const secondary = currentSumMap.get(j) || 0;
//       sum = secondary - primary;
//       // console.log(`i: ${i}, j: {${j}}, formula:${secondary} - ${primary}, sum: ${sum}`);
//       count += sum === k ? 1 : 0;
//     }
//   }
//   return count;
// };

// 2) Configure test parameters
// export const subarraySumTestCases: SubarraySumTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSubarraySum = (
//   testCase: SubarraySumTestCase = subarraySumTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = subarraySum(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
// console.log(subarraySum([1], 0))
console.log(subarraySum([1,2,3], 3))
