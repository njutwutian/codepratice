// Problem: maxDepth
// export type MaxDepthTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}
// 1) Source code
export const maxDepth = (root: TreeNode | null): number => {
    return depthRecursion(root, 0);
};

const depthRecursion = (root: TreeNode | null, seed: number) => {
  let left = 0;
  let mid = 0;
  let right = 0;
  if (root?.left) {
     left = depthRecursion(root.left, seed + 1);
  }
  if (root) {
     mid = seed + 1;
  }
  if (root?.right) {
     right = depthRecursion(root.right, seed + 1);
  }
  return Math.max(left, mid, right);
};

// 2) Configure test parameters
// export const maxDepthTestCases: MaxDepthTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMaxDepth = (
//   testCase: MaxDepthTestCase = maxDepthTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = maxDepth(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
