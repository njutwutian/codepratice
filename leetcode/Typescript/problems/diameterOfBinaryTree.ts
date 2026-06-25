// Problem: diameterOfBinaryTree
// export type DiameterOfBinaryTreeTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

import { TreeNode } from "./model/node";

export const diameterOfBinaryTree = (root: TreeNode | null): number => {
  let maxDiameter = 0;
  
  const depth = (node: TreeNode | null): number => {
    if (!node) return 0;

    const leftDepth = depth(node.left);
    const rightDepth = depth(node.right);

    // Update the maximum diameter found so far
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

    // Return the depth of the current node
    return Math.max(leftDepth, rightDepth) + 1;
  }

  depth(root);
  return maxDiameter;
}

// 1) Source code
// export const diameterOfBinaryTree = (root: TreeNode | null): number => {
//   if (!root) {
//     return 0;
//   }
//   return recursion(root).max - 1;
// };

// const recursion = (root: TreeNode | null): { max: number; depth: number } => {
//   let leftDepth = 0;
//   let leftMax = 0;
//   let rightDepth = 0;
//   let rightMax = 0;
//   let max = 0;
//   if (root?.left) {
//     const leftResult = recursion(root.left);
//     leftDepth = leftResult.depth;
//     leftMax = leftResult.max;
//   }
//   if (root?.right) {
//     const rightResult = recursion(root.right);
//     rightDepth = rightResult.depth;
//     rightMax = rightResult.max;
//   }
//   if (root) {
//     let all = leftDepth + rightDepth + 1;
//     max = Math.max(all, max);
//     // console.log("leftDepth:", leftDepth, "rightDepth:", rightDepth, "all:", all, "max:", max);
//     return {
//       max: Math.max(leftMax, rightMax, max),
//       depth: Math.max(leftDepth, rightDepth) + 1
//     }
//   }
//   return {
//     max: max,
//     depth: 0
//   };
// }

// 2) Configure test parameters
// export const diameterOfBinaryTreeTestCases: DiameterOfBinaryTreeTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runDiameterOfBinaryTree = (
//   testCase: DiameterOfBinaryTreeTestCase = diameterOfBinaryTreeTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = diameterOfBinaryTree(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
