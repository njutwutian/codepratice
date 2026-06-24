// Problem: dailyTemperatures
// export type DailyTemperaturesTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const dailyTemperatures = (temperatures: number[]): number[] => {
  const result = new Array(temperatures.length).fill(0);
  const stack: { key: number, value: number }[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    const temp = temperatures[i];
    let currentTop = stack.length > 0 ? stack[stack.length - 1] : null;
    while (currentTop && currentTop.key < i && currentTop.value < temp) {
      result[currentTop.key] = i - currentTop.key;
      stack.pop();
      currentTop = stack[stack.length - 1];
    }
    stack.push({
      key: i,
      value: temp
    });
  }
  return result;
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
console.log(dailyTemperatures([30,40,50,60]));
console.log(dailyTemperatures([30,60,90]));
// export const dailyTemperatures = (temperatures: number[]): number[] => {
//   const result = new Array(temperatures.length).fill(0);
//   for (let i = 0; i< temperatures.length-1; i++) {
//     for (let j = i + 1; j < temperatures.length; j++) {
//       if (temperatures[j] > temperatures[i]) {
//         result[i] = j - i;
//         break;
//       }
//     }
//   }
//   return result;
// };

// 2) Configure test parameters
// export const dailyTemperaturesTestCases: DailyTemperaturesTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runDailyTemperatures = (
//   testCase: DailyTemperaturesTestCase = dailyTemperaturesTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = dailyTemperatures(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
