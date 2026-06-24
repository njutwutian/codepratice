// Problem: largestAltitude
// export type LargestAltitudeTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const largestAltitude = (gain: number[]): number => {
    let max = 0;
    let current = 0;
    gain.forEach(e => {
      current += e;
      max = current > max ? current : max;
    });
    return max;
};

// 2) Configure test parameters
// export const largestAltitudeTestCases: LargestAltitudeTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runLargestAltitude = (
//   testCase: LargestAltitudeTestCase = largestAltitudeTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = largestAltitude(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
