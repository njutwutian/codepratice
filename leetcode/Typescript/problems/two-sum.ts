export type TwoSumTestCase = {
  nums: number[];
  target: number;
  expected: [number, number];
};

// 1) Source code
export const twoSum = (nums: number[], target: number): [number, number] => {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const n = nums[i];
    const need = target - n;
    const matchIndex = seen.get(need);

    if (matchIndex !== undefined) {
      return [matchIndex, i];
    }

    seen.set(n, i);
  }

  throw new Error("No solution found");
};

// 2) Configure test parameters
export const twoSumTestCases: TwoSumTestCase[] = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { nums: [3, 3], target: 6, expected: [0, 1] }
];

// 3) Run function
export const runTwoSum = (
  testCase: TwoSumTestCase = twoSumTestCases[0]
): [number, number] => {
  const result = twoSum(testCase.nums, testCase.target);
  console.log("twoSum input:", testCase.nums, "target:", testCase.target);
  console.log("twoSum result:", result, "expected:", testCase.expected);
  return result;
};
