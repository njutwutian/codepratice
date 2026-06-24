// Problem: copyRandomList
// export type CopyRandomListTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

class _Node {
    val: number
    next: _Node | null
    random: _Node | null

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
        this.random = (random===undefined ? null : random)
    }
}


// 1) Source code
export const copyRandomList = (head: _Node | null): _Node | null => {
    
  return null;
};

// 2) Configure test parameters
// export const copyRandomListTestCases: CopyRandomListTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runCopyRandomList = (
//   testCase: CopyRandomListTestCase = copyRandomListTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = copyRandomList(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
