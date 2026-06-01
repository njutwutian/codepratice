export type ProblemTestCase = {
  input: {
    nums: number[];
    target: number;
  };
  expected: [number, number];
};

// 1) Source code
export const solve = (nums: number[], target: number): [number, number] => {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const value = nums[i];
    const need = target - value;
    const matchIndex = seen.get(need);

    if (matchIndex !== undefined) {
      return [matchIndex, i];
    }

    seen.set(value, i);
  }

  throw new Error("No solution found");
};

// 2) Configure test parameters
export const testCases: ProblemTestCase[] = [
  { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
];

// 3) Run function
export const run = (testCase: ProblemTestCase = testCases[0]): [number, number] => {
  const { nums, target } = testCase.input;
  const result = solve(nums, target);

  console.log("input:", testCase.input);
  console.log("result:", result, "expected:", testCase.expected);

  return result;
};
