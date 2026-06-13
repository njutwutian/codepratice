// Problem: rotate
// export type RotateTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const rotate = (nums: number[], k: number): void => {
    const len = nums.length;
    const remainder = k % len;
    if (remainder > 0) {
        const headArray = nums.slice(len - remainder);
        const lastArray = nums.slice(0, len - remainder);
        nums.splice(0, len, ...headArray, ...lastArray);
    }
};

// 2) Configure test parameters
// export const rotateTestCases: RotateTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runRotate = (
//   testCase: RotateTestCase = rotateTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = rotate(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
