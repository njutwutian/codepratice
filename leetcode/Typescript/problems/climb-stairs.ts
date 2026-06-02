// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

export type TestCase = {
  input: number;
  target: number;
  expected: number;
};

// 1) Source code
export const climbStairs = (num: number): number => {
  let currentResult: number[] = [];
  for (let i = 0; i < num; i++) {
    if (i === 0) {
      currentResult.push(1);
    } else if (i === 1) {
      currentResult.push(currentResult[i - 1] + 1);
    } else {
      currentResult.push(currentResult[currentResult.length - 1] + currentResult[currentResult.length - 2]);
    }
  }
  return currentResult[currentResult.length - 1];
};

// 2) Configure test parameters
export const testCasesData: TestCase[] = [
  { input: 2, target: 2, expected: 2 },
  { input: 3, target: 3, expected: 3 },
];

// 3) Run function
export const runClimbStairs = (
  testCase: TestCase = testCasesData[0]
): number => {
  const result = climbStairs(testCase.input);
  console.log("climbStairs input:", testCase.input);
  console.log("climbStairs result:", result, "expected:", testCase.expected);
  return result;
};
