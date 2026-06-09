// Problem: sortColors
// export type SortColorsTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const sortColors = (nums: number[]): void => {
  let left = 0;
  let right = nums.length - 1;
  let current = 0;

  while (current <= right) {
    if (nums[current] === 0) {
      const temp = nums[current];
      nums[current] = nums[left];
      nums[left] = temp;
      left++;
      current++;
    } else if (nums[current] === 2) {
      const temp = nums[current];
      nums[current] = nums[right];
      nums[right] = temp;
      right--;
    } else {
      current++;
    }
  }
};

// 2) Configure test parameters
// export const sortColorsTestCases: SortColorsTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSortColors = (
//   testCase: SortColorsTestCase = sortColorsTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = sortColors(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
