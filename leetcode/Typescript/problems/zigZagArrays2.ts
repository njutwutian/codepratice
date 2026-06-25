// Problem: zigZagArrays
// export type ZigZagArraysTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };
// 2个数 length 3
// 2
// 3个数 length 3
// 分以下情况
// 1. 先取两个，3 * 2 = 6
// 2. 取三个，最大最小的放中间
//   a. 最大放中间 2
//   b. 最小放中间 2
// 一共 6 + 2 + 2 = 10

// // 以n = 3, count = 3
// // 需要迭代 length 范围 [1, n]
// // 当length = 1时
// up = [1,1,1];
// down = [1,1,1];
// // 当length = 2时，根据length = 1的结果继续迭代
// up = [0, 1, 2];
// down = [2, 1, 0];
// // 当length = 3时，根据length = 2的结果继续迭代
// up = [0, 2, 3];
// down = [3, 2, 0];

// up[i] = 
// down[i-1] * [[0,1,1]
//              [0,0,1]
//              [0,0,0]]

// down[i] =
// up[i-1] * [[0,0,0]
//            [1,0,0]
//            [1,1,0]]

// [up[i], down[i]] = [up[i-1], down[i-1]] * [[0,0,0,0,1,1]
//                                            [0,0,0,0,0,1]
//                                            [0,0,0,0,0,0]
//                                            [0,0,0,0,0,0]
//                                            [1,0,0,0,0,0]
//                                            [1,1,0,0,0,0]] 

const MOD = 1000000007n;

const multiply = (a: bigint[][], b: bigint[][]): bigint[][] => {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;

  const result = Array.from({ length: rowsA }, () => new Array(colsB).fill(0n));

  for (let i = 0; i < rowsA; i++) {
    const resultRow = result[i];
    const aRow = a[i];
    for (let k = 0; k < colsA; k++) {
      const aVal = aRow[k];
      if (aVal === 0n) {
        continue;
      }
      const bRow = b[k];
      for (let j = 0; j < colsB; j++) {
        resultRow[j] = (resultRow[j] + aVal * bRow[j]) % MOD;
      }
    }
  }
  return result;
}

const power = (matrix: bigint[][], exp: number): bigint[][] => {
  const size = matrix.length;
  let result: bigint[][] = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i === j ? 1n : 0n))
  );

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = multiply(result, matrix);
    }
    matrix = multiply(matrix, matrix);
    exp = Math.floor(exp / 2);
  }
  return result;
}
// 1) Source code
export const zigZagArrays = (n: number, l: number, r: number): number => {
  let result = 0n;
  const count = r - l + 1;
  const size = count * 2;

  if (n === 1) {
    return Number(BigInt(count) % MOD);
  }

  // 构建转移矩阵
  const metrix = Array.from({ length: size }, () => new Array(size).fill(0n));
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (i < j) {
        metrix[i][count + j] = 1n;
      } else if (i > j) {
        metrix[count + i][j] = 1n;
      }
    }
  }
  // 转移矩阵计算 n-1 次方
  // 计算 metrix^(n-1)
  const metrixNMinus1 = power(metrix, n - 1);

  // 初始向量为全 1，最终答案就是 metrix^(n-1) 全部元素之和。
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result = (result + metrixNMinus1[i][j]) % MOD;
    }
  }

  return Number(result);
};

console.log(zigZagArrays(63, 1, 4));

// 2) Configure test parameters
// export const zigZagArraysTestCases: ZigZagArraysTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runZigZagArrays = (
//   testCase: ZigZagArraysTestCase = zigZagArraysTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = zigZagArrays(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
