export type MajorityElementTestCase = {
  input: {
    nums: number[];
    target: number;
  };
  expected: [number, number];
};

// 1) Source code
export const majorityElement = (nums: number[]): number => {
    let voteNumber = 0;
    let current = 0;
    for (let num of nums) {
        if (voteNumber === 0) {
            current = num;
        }
        voteNumber += current === num ? 1: -1; 
    }
    return current;
};

// 2) Configure test parameters
// export const majorityElementTestCases: MajorityElementTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMajorityElement = (
//   testCase: MajorityElementTestCase = majorityElementTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = majorityElement(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
