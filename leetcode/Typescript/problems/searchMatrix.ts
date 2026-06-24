// Problem: searchMatrix
// export type SearchMatrixTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

export const searchMatrix = (matrix: number[][], target: number): boolean => {
  let searched = false;
  let row = 0;
  let column = matrix[0].length - 1;
  let end = false;

  while (!end) {
    if (column < 0 || row > matrix.length - 1) {
      end = true;
      break;
    }
    const current = matrix[row][column];
    // console.log("current:", current, "row:", row, "column:", column);
    if (target > current) {
      row++;
      continue;
    }
    if (target < current) {
      column--;
      continue;
    }
    if (target === current) {
      end = true;
      searched = true;
      continue;
    }
  }

  return searched;
}

// 1) Source code
// 240. Search a 2D Matrix II 错误解法，剪枝不正确
// export const searchMatrix = (matrix: number[][], target: number): boolean => {
//   let row = 0;
//   let column = 0;
//   let maxRowLength = matrix.length;
//   let maxColumnLength = matrix[0].length;

//   let searched = false;
//   let end = false;
//   while (!end) {
//     const current = matrix[row][column];
//     console.log("current:", current, "row:", row, "column:", column);
//     // searched
//     if (current === target) {
//       end = true;
//       searched = true;
//       break;
//     } else {
//       if (current < target && column + 1 < maxColumnLength) {
//         // search right
//         column++;
//         continue;
//       }

//       if (current > target && column > 0) {
//         // back leaft
//         maxColumnLength = column;
//         column--;
//         continue;
//       }

//       if (current < target && row + 1 < maxRowLength) {
//         row++;
//         continue;
//       }

//       if (current > target && row > 0) {
//         maxRowLength = row;
//         row--;
//         continue;
//       }

//       // cant move
//       end = true;
//       break;
//     }
//   }

//   return searched;
// };

console.log(searchMatrix([[1],[3],[5]], 2));
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5));
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 31));
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 0));
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20));

// 2) Configure test parameters
// export const searchMatrixTestCases: SearchMatrixTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSearchMatrix = (
//   testCase: SearchMatrixTestCase = searchMatrixTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = searchMatrix(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
