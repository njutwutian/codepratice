// Problem: maxIceCream
// export type MaxIceCreamTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const maxIceCream = (costs: number[], coins: number): number => {
  let count = 0;
  const max = Math.max(...costs);
  const min = Math.min(...costs);
  const length = max - min + 1;

  const array = new Array(length).fill(0);
  costs.forEach(e => {
    array[e - min]++;
  });

  let currentPrice = min;
  for (const e of array) {
    if (coins < currentPrice) {
      break;
    }
    let currentCount = e;
    while (currentCount > 0) {
      if (coins >= currentPrice) {
        coins -= currentPrice;
        currentCount--;
        count++;
      } else {
        break;
      }
    }
    currentPrice++;
  };

  return count;
};

// 2) Configure test parameters
// export const maxIceCreamTestCases: MaxIceCreamTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMaxIceCream = (
//   testCase: MaxIceCreamTestCase = maxIceCreamTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = maxIceCream(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
