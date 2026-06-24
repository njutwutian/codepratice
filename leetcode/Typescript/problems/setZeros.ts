// Problem: setZeros
// export type SetZerosTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const setZeros = (matrix: number[][]): void => {
    const rMap = new Set<number>();
    const cMap = new Set<number>();
    matrix.forEach((x, rIndex) => {
      x.forEach((y, cIndex) => {
        if (y === 0) {
          rMap.add(rIndex);
          cMap.add(cIndex);
        }
      });
    });

    matrix.forEach((x, rIndex) => {
      x.forEach((y, cIndex) => {
        if (y !== 0) {
          if (rMap.has(rIndex) || cMap.has(cIndex)) {
            matrix[rIndex][cIndex] = 0; 
          }
        }
      });
    });
};
// // 1) Source code
// export const setZeros = (matrix: number[][]): void => {
//     const rMap = new Map();
//     const cMap = new Map();
//     matrix.forEach((x, rIndex) => {
//       x.forEach((y, cIndex) => {
//         if (y === 0) {
//           if (!rMap.has(rIndex)) {
//             rMap.set(rIndex, 1);
//           }
//           if (!cMap.has(cIndex)) {
//             cMap.set(cIndex, 1);
//           }
//         }
//       });
//     });

//     matrix.forEach((x, rIndex) => {
//       x.forEach((y, cIndex) => {
//         if (y !== 0) {
//           if (rMap.has(rIndex) || cMap.has(cIndex)) {
//             matrix[rIndex][cIndex] = 0; 
//           }
//         }
//       });
//     });
// };

// 2) Configure test parameters
// export const setZerosTestCases: SetZerosTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSetZeros = (
//   testCase: SetZerosTestCase = setZerosTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = setZeros(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
