// Problem: countMajoritySubarrays
// export type CountMajoritySubarraysTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 用n个相同的数，和m个不同的数 合成一个数组
// 长度 1  1-0
// n
// 长度 2  2-0
// n * n - 1
// 长度 3  2-1 3-0
// n * n - 1 * m
// n * n - 1 * n - 2
// 长度 4  3-1 4-0
// n * n - 1 * n - 2 * m
// n * n - 1 * n - 2 * n - 3
// 长度 5  3-2 4-1 5-0
// n * n - 1 * n - 2 * m * m - 1
// n * n - 1 * n - 2 * n - 3 * n - 4
// 长度 6  4-2 5-1 6-0

// 1) Source code
export const countMajoritySubarrays = (nums: number[], target: number): number => {
    let result = 0;
    const preFixSum = new Array(nums.length+1).fill(0);
    for (let i = 0; i < nums.length; i++) {
        const temp = nums[i] === target ? 1 : 0;
        preFixSum[i + 1] = preFixSum[i] + temp;
    }

    for (let i = 0; i < preFixSum.length - 1; i++) {
        for (let j = i + 1; j < preFixSum.length; j++) {
            const tempCount = preFixSum[j] - preFixSum[i];
            const tempLength = j - i
            if (tempCount * 2 > tempLength) {
                result++;
            }
        }
    }

    return result;
};

// 2) Configure test parameters
// export const countMajoritySubarraysTestCases: CountMajoritySubarraysTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runCountMajoritySubarrays = (
//   testCase: CountMajoritySubarraysTestCase = countMajoritySubarraysTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = countMajoritySubarrays(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
