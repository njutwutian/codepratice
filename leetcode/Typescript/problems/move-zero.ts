export type MoveZeroTestCase = {
  input: {
    nums: number[];
  };
  expected: number[];
};

// 1) Source code
// export const moveZero = (nums: number[]): number[] => {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i+1; j < nums.length; j++) {
//       if (nums[i] === 0 || (nums[j] !== 0 && nums[i] > nums[j])) {
//         const temp = nums[i];
//         nums[i] = nums[j];
//         nums[j] = temp;
//       }
//     }
//   }
//   return nums;
// };
export const moveZero = (nums: number[]): number[] => {
  let slow = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[slow] = nums[i];
      slow++;
    }
  }

  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};

// 2) Configure test parameters
export const moveZeroTestCases: MoveZeroTestCase[] = [
  { input: { nums: [0, 1, 0, 3, 12] }, expected: [1, 3, 12, 0, 0] },
  { input: { nums: [2, 1] }, expected: [2, 1] }
];

// 3) Run function
export const runMoveZero = (
  testCase: MoveZeroTestCase = moveZeroTestCases[0]
): number[] => {
  const input = [...testCase.input.nums];
  const result = moveZero([...testCase.input.nums]);

  console.log("input:", input);
  console.log("result:", result, "expected:", testCase.expected);

  return result;
};
