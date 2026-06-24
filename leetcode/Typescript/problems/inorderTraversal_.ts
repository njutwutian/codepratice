// Problem: inorderTraversal
// export type InorderTraversalTestCase = {
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
export const inorderTraversal = (root: TreeNode | null): number[] => {
    return midRecursion(root) || [];
};

const midRecursion = (root: TreeNode | null): number[] | null => {
  if (root) {
    let result = [];
    if (root.left) {
      const leftResult = midRecursion(root.left);
      if (leftResult) {
        result.push(...leftResult);
      }
    }
    if (root) {
      result.push(root.val);
    }
    if (root.right) {
      const rightResult = midRecursion(root.right);
      if (rightResult) {
        result.push(...rightResult);
      }
    }
    return result;
  } else {
    return null;
  }
};

// 2) Configure test parameters
// export const inorderTraversalTestCases: InorderTraversalTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runInorderTraversal = (
//   testCase: InorderTraversalTestCase = inorderTraversalTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = inorderTraversal(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
