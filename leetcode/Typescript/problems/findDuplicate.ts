// Problem: findDuplicate
// export type FindDuplicateTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const findDuplicate = (nums: number[]): number => {
  let fast = 0;
  let slow = 0;
  while (true) {
    fast = nums[nums[fast]];
    slow = nums[slow];
    if (fast === slow) {
      break;
    }
  }
  
  let finder = 0;
  while (true) {
    fast = nums[fast];
    finder = nums[finder];
    if (fast === finder) {
      break;
    }
  }
  return fast;
};

// 2) Configure test parameters
// export const findDuplicateTestCases: FindDuplicateTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runFindDuplicate = (
//   testCase: FindDuplicateTestCase = findDuplicateTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = findDuplicate(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
