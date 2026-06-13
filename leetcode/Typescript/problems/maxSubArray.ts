// Problem: maxSubArray
// export type MaxSubArrayTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

export const maxSubArray = (nums: number[]): number => {
  let maxSum = nums[0];
  let preSum = nums[0];
  for (let i=1; i< nums.length; i++) {
    preSum = Math.max(preSum + nums[i],nums[i]);
    maxSum = Math.max(preSum, maxSum);
  }

  return maxSum;
}

// 1) Source code
// export const maxSubArray = (nums: number[]): number => {
//   if (nums.length === 1) {
//     return nums[0];
//   }
//   let maxSum = nums[0];
//   let currentSum = nums[0];
//   let preSumMax = nums[0];
//   let result = [];
//   let match: any = [nums[0]];
//   for (let i = 1; i < nums.length; i++) {
//     currentSum = currentSum ? currentSum + nums[i] : nums[i];
//     preSumMax = preSumMax > currentSum ? preSumMax : currentSum;
//     if (match[1] !== undefined) {
//       if (currentSum > match[1]) {
//         match[1] = currentSum;
//       }
//     } else {
//       match[1] = currentSum;
//     }
//     if (match[0] !== undefined) {
//       if (currentSum < match[0]) {
//         if (match[1] !== undefined) {
//           result.push(match);
//           match = [currentSum];
//         } else {
//           match[0] = currentSum;
//         }
//       }
//     } else {
//       match[0] = currentSum;
//     }
//     // console.log(match);
//   }
//   result.push(match);
//   result.forEach(e => {
//     const temp = e[1] - e[0];
//     maxSum = temp > maxSum ? temp : maxSum;
//   });
//   // console.log(result);
//   return preSumMax > maxSum ? preSumMax : maxSum;
// };

// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
// console.log(maxSubArray([5,4,-1,7,8]));
console.log(maxSubArray([-3,1,0,-1,-2,3,2,-1]));

// 2) 超出时间限制
// export const maxSubArray = (nums: number[]): number {
//     let maxSum = nums[0];
//     let preSum = [0, nums[0]];
//     let currentSum = nums[0];
//     for (let i = 1; i < nums.length; i++) {
//       currentSum += nums[i];
//       preSum.push(currentSum);
//     }

//     for (let i = 0; i< preSum.length; i++) {
//       for (let j = i + 1; j<preSum.length; j++) {
//         const temp = preSum[j] - preSum[i];
//         maxSum = temp > maxSum ? temp : maxSum;
//       }
//     }

//     return maxSum;
// };

// 2) Configure test parameters
// export const maxSubArrayTestCases: MaxSubArrayTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMaxSubArray = (
//   testCase: MaxSubArrayTestCase = maxSubArrayTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = maxSubArray(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
