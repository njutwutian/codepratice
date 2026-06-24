// Problem: sortedArrayToBST
// export type SortedArrayToBSTTestCase = {
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
export const sortedArrayToBST = (nums: number[]): TreeNode | null => {
    return buildBST(nums, 0, nums.length - 1);
};

const buildBST = (nums: number[], left: number, right: number): TreeNode | null => {
  if (left > right) {
    return null;
  }
  const mid = Math.floor((left + right) / 2);
  const leftNode = buildBST(nums, left, mid - 1);
  const rightNode = buildBST(nums, mid + 1, right);
  const midNode = new TreeNode(nums[mid], leftNode, rightNode);
  return midNode;
}

// 2) Configure test parameters
// export const sortedArrayToBSTTestCases: SortedArrayToBSTTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runSortedArrayToBST = (
//   testCase: SortedArrayToBSTTestCase = sortedArrayToBSTTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = sortedArrayToBST(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
