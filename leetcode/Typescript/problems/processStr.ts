// Problem: processStr
// export type ProcessStrTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const processStr = (s: string): string => {
    let result = "";
    let codeA = "a".charCodeAt(0);
    let codeZ = "z".charCodeAt(0);
    let codeTimes = "*".charCodeAt(0);
    let codeSharp = "#".charCodeAt(0);
    let codePercent = "%".charCodeAt(0);
    for (let i = 0; i < s.length; i++) {
      const tempCode = s.charCodeAt(i);
      if (tempCode === codeTimes) {
        result = result.length > 0 ? result.substring(0, result.length - 1) : "";
      }
      if (tempCode === codeSharp) {
        result = result + result;
      }
      if (tempCode === codePercent) {
        result = result.split("").reverse().join("");
      }
      if (tempCode > codeA - 1 && tempCode < codeZ + 1) {
        result += String.fromCharCode(tempCode);
      }
    }
    return result;
};

// 2) Configure test parameters
// export const processStrTestCases: ProcessStrTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runProcessStr = (
//   testCase: ProcessStrTestCase = processStrTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = processStr(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
