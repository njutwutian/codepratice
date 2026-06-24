// Problem: rotateMetrix
// export type RotateMetrixTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 00 01 02
// 10 11 12
// 20 21 22

// 20 10 00
// 21 11 01
// 22 12 02

// 001 010  100
// 001
// 001


// 1) Source code
export const rotateMatrix = (matrix: number[][]): void => {
  let array = [];
  let length = matrix.length;
  let row = length - 1;
  let column = 0;
  while (array.length !== length * length) {
    array.push(matrix[row][column]);
    // calculate next
    if (row === 0) {
      row = length - 1;
      column++;
    } else {
      row--;
    }
  }
  let index = 0;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      matrix[i][j] = array[index];
      index++;
    }
  }
  console.log(matrix);
};
// 2) Configure test parameters
// export const rotateMetrixTestCases: RotateMetrixTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runRotateMetrix = (
//   testCase: RotateMetrixTestCase = rotateMetrixTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = rotateMetrix(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
