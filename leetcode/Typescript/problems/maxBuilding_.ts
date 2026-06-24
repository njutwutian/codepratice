// Problem: maxBuilding
// export type MaxBuildingTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const maxBuilding = (n: number, restrictions: number[][]): number => {
    const array = new Array(n).fill(-1);

    restrictions.filter(e => (e[0] - 1) >= e[1]).forEach(e => {
      array[e[0] - 1] = e[1];
    });

    array[0] = 0;
    for (let i = 1; i< array.length; i++) {
      const min = array[i - 1] - 1 > 0 ? array[i - 1] - 1 : 0;
      const max = array[i - 1] + 1;
      if (array[i] > -1) {
        if (max < array[i]) {
          // 符合限高，需要接触限高，因为最高达不到限高
          array[i] = max;
        } else if (max >= array[i] && array[i] >= min) {
          // 不用变，合法范围，最高就是限高
        } else if (array[i] < min) {
          // 前面搞得太高了，想想办法搞低一点
          // 那就得重新算前一个的限高，然后退回
          array[i - 1] = array[i] + 1;
        } else {
          break;
        }

      } else {
        array[i] = max;
      }
    }

    return 0;
};

// 2) Configure test parameters
// export const maxBuildingTestCases: MaxBuildingTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMaxBuilding = (
//   testCase: MaxBuildingTestCase = maxBuildingTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = maxBuilding(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
