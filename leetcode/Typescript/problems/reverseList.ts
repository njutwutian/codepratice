// Problem: reverseList
// export type ReverseListTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

/**
 * Definition for singly-linked list.
*/
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// 1) Source code
export const reverseList = (head: ListNode | null): ListNode | null => {
  let currentHead: ListNode | null = null;
  let currentNext: ListNode | null = head;

  while (currentNext) {
    currentHead = new ListNode(currentNext.val, currentHead);
    currentNext = currentNext.next;
  }
  return currentHead;
};
// export const reverseList = (head: ListNode | null): ListNode | null => {
//   let result = [];
//   let current: ListNode | null | undefined = head;
//   while (current) {
//     result.push(current?.val);
//     current = current?.next;
//   }
//   let currentHead: ListNode | null = null;
//   for (let i = 0; i < result.length; i++) {
//     const tempNode: any = new ListNode(result[i], currentHead);
//     currentHead = tempNode;
//   }
//   return currentHead;
// };

// 2) Configure test parameters
// export const reverseListTestCases: ReverseListTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runReverseList = (
//   testCase: ReverseListTestCase = reverseListTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = reverseList(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
