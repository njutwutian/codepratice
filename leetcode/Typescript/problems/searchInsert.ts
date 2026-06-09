// Problem: searchInsert
// export type SearchInsertTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const searchInsert = (nums: number[], target: number): number => {
  let start = 0 ;
  let end = nums.length - 1;
  let mid = Math.floor((start + end) / 2);
  while (start < end - 1) {
    // console.log(`${start} - ${end}`);
    if (target < nums[mid]) {
      end = mid;
      mid = Math.floor((start + end) / 2);
    } else if (target > nums[mid]) {
      start = mid;
      mid = Math.floor((start + end) / 2);
    } else {
      break;
    }
  }
  if (nums[mid] === target) {
    return mid;
  } else {
    if (nums[start] >= target) {
      return start;
    }else if (nums[end] >= target) {
      return end;
    } else {
      return end + 1;
    }
  }
};

// 2) Configure test parameters
// export const searchInsertTestCases: SearchInsertTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSearchInsert = (
//   testCase: SearchInsertTestCase = searchInsertTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = searchInsert(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };

console.log(searchInsert([1,3,5,6], 5));
console.log(searchInsert([1,3,5,6], 2));
console.log(searchInsert([1,3,5,6], 7));
