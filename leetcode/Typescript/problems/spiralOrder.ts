// Problem: spiralOrder
// export type SpiralOrderTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const spiralOrder = (matrix: number[][]): number[] => {
    let result: number[] = [];
    let maxRow = matrix.length;
    let maxColumn = matrix[0].length;
    let currentDirection: 'right' | 'down' | 'left' | 'up' = "right";
    let rowIndex = 0;
    let columnIndex = 0;
    let timeOut = 0;
    result.push(matrix[rowIndex][columnIndex]);
    matrix[rowIndex][columnIndex] = 101;
    while (timeOut < 4) {
      if (currentDirection === "right") {
        timeOut++;
        if (columnIndex < maxColumn - 1 && matrix[rowIndex][columnIndex + 1] !== 101) {
          columnIndex++;
        } else {
          // change to down
          currentDirection = 'down';
          continue;
        }
      } else if (currentDirection === "down") {
        timeOut++;
        if (rowIndex < maxRow - 1 && matrix[rowIndex + 1][columnIndex] !== 101) {
          rowIndex++;
        } else {
          // change to left
          currentDirection = 'left';
          continue;
        }
      } else if (currentDirection === "left") {
        timeOut++;
        if (columnIndex > 0 && matrix[rowIndex][columnIndex - 1] !== 101) {
          columnIndex--;
        } else {
          // change to up
          currentDirection = 'up';
          continue;
        }
      } else if (currentDirection === "up") {
        timeOut++;
        if (rowIndex > 0 && matrix[rowIndex - 1][columnIndex] !== 101) {
          rowIndex--;
        } else {
          // change to left
          currentDirection = 'right';
          continue;
        }
      }
      timeOut = 0;
      result.push(matrix[rowIndex][columnIndex]);
      matrix[rowIndex][columnIndex] = 101;
    }
    return result;
};

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));

// 2) Configure test parameters
// export const spiralOrderTestCases: SpiralOrderTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSpiralOrder = (
//   testCase: SpiralOrderTestCase = spiralOrderTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = spiralOrder(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
