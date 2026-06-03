// Problem: isValid
// export type IsValidTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const isValid = (s: string): boolean => {
  const aBracket = "()[]{}".charCodeAt(0);
  const bBracket = "()[]{}".charCodeAt(1);
  const cBracket = "()[]{}".charCodeAt(2);
  const dBracket = "()[]{}".charCodeAt(3);
  const eBracket = "()[]{}".charCodeAt(4);
  const fBracket = "()[]{}".charCodeAt(5);
  const leftStack: number[] = [];
  for (let char of s) {
    const lastOfStack = leftStack[leftStack.length - 1];
    const charCode = char.charCodeAt(0);
    if ((lastOfStack === aBracket && charCode === bBracket) || (lastOfStack === cBracket && charCode === dBracket) || (lastOfStack === eBracket && charCode === fBracket)) {
      leftStack.pop();
    } else {
      leftStack.push(charCode);
    }
  }
  return leftStack.length === 0;
};

// 2) Configure test parameters
// export const isValidTestCases: IsValidTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runIsValid = (
//   testCase: IsValidTestCase = isValidTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = isValid(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
