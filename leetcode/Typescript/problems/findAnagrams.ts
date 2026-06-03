// Problem: findAnagrams
// export type FindAnagramsTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const findAnagrams = (s: string, p: string): number[] => {
  const sLength = s.length;
  const aCharCode = "a".charCodeAt(0);
  const pLength = p.length;
  if (sLength < pLength) {
    return [];
  }
  let result: number[] = [];
  const sResult = new Array(26).fill(0);
  const pResult = new Array(26).fill(0);
  for (let pChar of p) {
    pResult[pChar.charCodeAt(0) - aCharCode]++;
  }
  // get first window of s string
  for (let i = 0; i < pLength; i++) {
    sResult[s.charCodeAt(i) - aCharCode]++;
  }
  if (matchString(sResult, pResult)) {
    result.push(0);
  }
  for (let i = 1; i <= sLength - pLength; i++) {
    sResult[s.charCodeAt(i - 1) - aCharCode]--;
    sResult[s.charCodeAt(i + pLength - 1) - aCharCode]++;
    if (matchString(sResult, pResult)) {
      result.push(i);
    }
  }
  return result;
};

const matchString = (sResult: number[], pResult: number[]): boolean => {
  return sResult.toString() === pResult.toString();
}

// 低效
// 1) Source code
// export const findAnagrams = (s: string, p: string): number[] => {
//   let result: number[] = [];
//   const orderP = p.split("").sort().join("");
//   const orderPResult = new Array(26).fill(0);
//   for (let pChar of p) {
//     orderPResult[pChar.charCodeAt(0) - "a".charCodeAt(0)]++;
//   }
//   const pLength = p.length;
//   for (let i = 0; i <= s.length - pLength; i++) {
//     let currentItem = s.substring(i, i + pLength);
//     if (matchString(currentItem, orderPResult)) {
//       result.push(i);
//     }
//   }
//   return result;
// };

// const matchString = (s: string, orderPResult: number[]): boolean => {
//   const currentItemResult = new Array(26).fill(0);
//   for (let sChar of s) {
//     currentItemResult[sChar.charCodeAt(0) - "a".charCodeAt(0)]++;
//   }
//   for (let i = 0; i < 26; i++) {
//     if (currentItemResult[i] !== orderPResult[i]) {
//       return false;
//     }
//   }
//   return true;
// }

// 双超
// export const findAnagrams = (s: string, p: string): number[] => {
//   let result: number[] = [];
//   const orderP = p.split("").sort().join("");
//   const pLength = p.length;
//   for (let i = 0; i <= s.length - pLength; i++) {
//     let currentItem = s.substring(i, i + pLength);
//     if (matchString(currentItem, orderP)) {
//       result.push(i);
//     }
//   }
//   return result;
// };

// const matchString = (s: string, orderP: string): boolean => {
//   if (s.split("").sort().join("") === orderP) {
//     return true;
//   }
//   return false;
// }

// 2) Configure test parameters
// export const findAnagramsTestCases: FindAnagramsTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runFindAnagrams = (
//   testCase: FindAnagramsTestCase = findAnagramsTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = findAnagrams(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
