// Problem: isPalindrome
// export type IsPalindromeTestCase = {
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
export const reverseList = (head: ListNode | null): boolean => {
  let result = true;
  let array = [];
  while (head) {
    array.push(head.val);
    head = head.next;
  }

  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    if (array[left] != array[right]) {
      result = false;
      break;
    } else {
      left++;
      right--;
    }
  }

  return result;
};
// export const reverseList = (head: ListNode | null): boolean => {
//   let result = true;
//   let currentNode = null;
//   let currentNext = head;
//   while (currentNext) {
//     currentNode = new ListNode(currentNext.val, currentNode);
//     currentNext = currentNext.next;
//   }

//   let compare: any = head;

//   while (compare) {
//     if (compare?.val === currentNode?.val) {
//       compare = compare?.next;
//       currentNode = currentNode?.next;
//     } else {
//       result = false;
//       break;
//     }
//   }

//   return result;
// };

// 2) Configure test parameters
// export const isPalindromeTestCases: IsPalindromeTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runIsPalindrome = (
//   testCase: IsPalindromeTestCase = isPalindromeTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = isPalindrome(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
