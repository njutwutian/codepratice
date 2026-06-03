export type SingleNumberTestCase = {
  input: {
    nums: number[];
    target: number;
  };
  expected: [number, number];
};

// 1) Source code
// 时间复杂度 O(n^2)，空间复杂度 O(1)
export const singleNumber = (nums: number[]): number => {
    let current = nums[0];
    for (let i = 0; i < nums.length; i++) {
        current = nums[i];
        let notMatch = false;
        for (let j = 0; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            if (nums[i] === nums[j]) {
                notMatch = true;
                break;
            }
        }
        if (!notMatch) {
            break;
        }
    }
    return current;
};

// 时间复杂度 O(n)，空间复杂度 O(1)
// export const singleNumber = (nums: number[]): number => {
//     let current = 0;
//     for (let i = 0; i < nums.length; i++) {
//         current ^= nums[i];
//     }
//     return current;
// };

// 2) Configure test parameters
export const singleNumberTestCases: SingleNumberTestCase[] = [
  { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
];

// 3) Run function
// export const runSingleNumber = (
//   testCase: SingleNumberTestCase = singleNumberTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = singleNumber(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
