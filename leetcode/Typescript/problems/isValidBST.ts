// Problem: isValidBST
// export type IsValidBSTTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

import { TreeNode } from "./model/node";

// 1) Source code
// export const isValidBST = (root: TreeNode | null): boolean => {
//     let isValid = true;

//     const recursionCheck = (root: TreeNode | null, lower: number, upper: number) => {
//       if (!root) {
//         return;
//       }

//       if (isValid) {
//         recursionCheck(root.left, lower, root.val);
//         recursionCheck(root.right, root.val, upper);
//         if (root.val <= lower || root.val >= upper) {
//           isValid = false;
//         }
//       } else {
//         return;
//       }
//     }
//     recursionCheck(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
//     return isValid;
// };

export const isValidBST = (root: TreeNode | null): boolean => {
  const recursionCheck = (
    node: TreeNode | null,
    lower: number,
    upper: number
  ): boolean => {
    if (!node) {
      return true;
    }

    if (node.val <= lower || node.val >= upper) {
      return false;
    }

    return (
      recursionCheck(node.left, lower, node.val) &&
      recursionCheck(node.right, node.val, upper)
    );
  };

  return recursionCheck(root, -Infinity, Infinity);
};

// 2) Configure test parameters
// export const isValidBSTTestCases: IsValidBSTTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runIsValidBST = (
//   testCase: IsValidBSTTestCase = isValidBSTTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = isValidBST(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
