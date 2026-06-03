// export type LongestConsecutiveTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const longestConsecutive = (nums: number[]): number => {
  let longest = 0;
  const numSet = new Set(nums);

  for (let num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLongest = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLongest++;
      }

      longest = Math.max(longest, currentLongest);
    }
  }
  return longest;
};

// 2) Configure test parameters
// export const longestConsecutiveTestCases: LongestConsecutiveTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runLongestConsecutive = (
//   testCase: LongestConsecutiveTestCase = longestConsecutiveTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = longestConsecutive(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
