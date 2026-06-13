// Problem: hasCycle
// export type HasCycleTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 1) Source code
export const hasCycle = (head: ListNode | null): boolean => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;
    if (slow && slow === fast) return true;
  }
  return false;
};

// export const hasCycle = (head: ListNode | null): boolean => {
//   let result = false;

//   let slow: ListNode | null | undefined = head;
//   let fast: ListNode | null | undefined = head;

//   slow = slow?.next;
//   fast = fast?.next?.next;
//   while (fast != null) {
//     if (slow === fast) {
//       break;
//     } else {
//       slow = slow?.next;
//       fast = fast?.next?.next;
//     }
//   }

//   if (fast === null) {
//     return false;
//   }

//   slow = head;
//   while (fast != null) {
//     if (slow === fast) {
//       result = true;
//       break;
//     } else {
//       slow = slow?.next;
//       fast = fast?.next;
//     }
//   }

//   return result;
// };

// 2) Configure test parameters
// export const hasCycleTestCases: HasCycleTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runHasCycle = (
//   testCase: HasCycleTestCase = hasCycleTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = hasCycle(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
