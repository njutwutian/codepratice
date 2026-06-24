// Problem: maxNumberOfBalloons
// export type MaxNumberOfBalloonsTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const maxNumberOfBalloons = (text: string): number => {
  const sign = "balon";
  const charCodeOfB = sign.charCodeAt(0);
  const charCodeOfA = sign.charCodeAt(1);
  const charCodeOfL = sign.charCodeAt(2);
  const charCodeOfO = sign.charCodeAt(3);
  const charCodeOfN = sign.charCodeAt(4);
  const scoreArray = new Array(5).fill(0);
  for (let i = 0; i < text.length; i++) {
    const current = text.charCodeAt(i);
    switch (current) {
      case charCodeOfB:
        scoreArray[0]++;
        break;
      case charCodeOfA:
        scoreArray[1]++;
        break;
      case charCodeOfN:
        scoreArray[4]++;
        break;
      case charCodeOfO:
        scoreArray[3] += 0.5;
        break;
      case charCodeOfL:
        scoreArray[2] += 0.5;
        break;
      default:
        break;
    }
  }
  scoreArray[3] = Math.floor(scoreArray[3]);
  scoreArray[2] = Math.floor(scoreArray[2]);
  // console.log(scoreArray);
  return Math.min(...scoreArray);
};
console.log(maxNumberOfBalloons("nlaebolko"));
console.log(maxNumberOfBalloons("loonbalxballpoon"));
console.log(maxNumberOfBalloons("leetcode"));
// 2) Configure test parameters
// export const maxNumberOfBalloonsTestCases: MaxNumberOfBalloonsTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMaxNumberOfBalloons = (
//   testCase: MaxNumberOfBalloonsTestCase = maxNumberOfBalloonsTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = maxNumberOfBalloons(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
