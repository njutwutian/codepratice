// Problem: isSymmetric
// export type IsSymmetricTestCase = {
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

// 维护两个array
// 左右中
// 右左中

// 1) Source code
export const isSymmetric = (root: TreeNode | null): boolean => {
    let left:(number | null)[] = [];
    let right:(number | null)[] = [];
    if (root?.left) {
       left = leftRecursion(root?.left);
    }
    if (root?.right) {
       right = rightRecursion(root?.right);
    }
    if (left.length !== right.length) {
      return false;
    }
    for (let i = 0; i < left.length; i++) {
      if (left[i] !== right[i]) {
        return false;
      }
    }
    return true;
};

const leftRecursion = (root: TreeNode | null): (number | null)[] => {
  let result = [];
  if (root?.left) {
    const leftResult = leftRecursion(root.left);
    if (leftResult) {
      result.push(...leftResult);
    }
  } else {
    result.push(null);
  }
  if (root?.right) {
    const rightResult = leftRecursion(root.right);
    if (rightResult) {
      result.push(...rightResult);
    }
  } else {
    result.push(null);
  }
  if (root) {
    result.push(root.val);
  } else {
    result.push(null);
  }
  return result;
}

const rightRecursion = (root: TreeNode | null): (number | null)[] => {
  let result = [];
  if (root?.right) {
    const rightResult = rightRecursion(root.right);
    if (rightResult) {
      result.push(...rightResult);
    }
  } else {
    result.push(null);
  }
  if (root?.left) {
    const leftResult = rightRecursion(root.left);
    if (leftResult) {
      result.push(...leftResult);
    }
  } else {
    result.push(null);
  }
  if (root) {
    result.push(root.val);
  } else {
    result.push(null);
  }
  return result;
}

// 2) Configure test parameters
// export const isSymmetricTestCases: IsSymmetricTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runIsSymmetric = (
//   testCase: IsSymmetricTestCase = isSymmetricTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = isSymmetric(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
