// Problem: detectCycle
// export type DetectCycleTestCase = {
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
export const detectCycle = (head: ListNode | null): ListNode | null => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow?.next ?? null;
    fast = fast.next.next;
    if (slow && slow === fast) break;
  }
  if (fast === null || fast.next === null) return null;
  
  slow = head;

  while (fast) {
    if (slow === fast) break;
    slow = slow?.next ?? null;
    fast = fast?.next ?? null;
  }

  return slow;
};

// 2) Configure test parameters
// export const detectCycleTestCases: DetectCycleTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runDetectCycle = (
//   testCase: DetectCycleTestCase = detectCycleTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = detectCycle(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
