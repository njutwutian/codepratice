// Problem: mapWordWeights
// export type MapWordWeightsTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const mapWordWeights = (words: string[], weights: number[]): string => {
    let aCharCode = "a".charCodeAt(0);
    let revertedMap = "zyxwvutsrqponmlkjihgfedcba"
    let string = "";
    words.forEach(x => {
      let weightSum = 0;
      for (let i = 0; i < x.length; i++) {
        const weight = weights[x.charCodeAt(i) - aCharCode];
        weightSum += weight;
      }
      string += revertedMap.charAt(weightSum % 26);
    });
    return string;
};

console.log(mapWordWeights(["abcd","def","xyz"], [5,3,12,14,1,2,3,2,10,6,6,9,7,8,7,10,8,9,6,9,9,8,3,7,7,2]));

// 2) Configure test parameters
// export const mapWordWeightsTestCases: MapWordWeightsTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMapWordWeights = (
//   testCase: MapWordWeightsTestCase = mapWordWeightsTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = mapWordWeights(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
