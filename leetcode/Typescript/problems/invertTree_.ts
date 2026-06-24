// Problem: invertTree
// export type InvertTreeTestCase = {
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
export const invertTree = (root: TreeNode | null): TreeNode | null => {
  let leftNode = null;
  let rightNode = null;
  if (root?.left) {
    leftNode = invertTree(root.left);
  }
  if (root?.right) {
    rightNode = invertTree(root.right);
  }
  if (root) {
    root.right = leftNode;
    root.left = rightNode;
  }
  return root;
};

// 2) Configure test parameters
// export const invertTreeTestCases: InvertTreeTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runInvertTree = (
//   testCase: InvertTreeTestCase = invertTreeTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = invertTree(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
