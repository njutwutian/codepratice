// Problem: mergeTwoLists
// export type MergeTwoListsTestCase = {
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
export const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
  if (list1 && list2) {
    return list1.val < list2.val ? new ListNode(list1.val, mergeTwoLists(list1.next, list2)): new ListNode(list2.val, mergeTwoLists(list1, list2.next));
  } else if (list1 && !list2) {
    return list1
  } else if (!list1 && list2) {
    return list2
  } else {
    return null;
  }
}
// 1) Source code
// export const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
//   if (list1 && list2) {
//     let mainHead = null;
//     let last = null;
//     let temp = null;
//     while (list1 || list2) {
//       if (list1 && list2) {
//         if (list1.val < list2.val) {
//           temp = new ListNode(list1.val, null);
//           list1 = list1.next;
//         } else {
//           temp = new ListNode(list2.val, null);
//           list2 = list2.next;
//         }
//         if (mainHead) {
//           last.next = temp;
//           last = last!.next;
//         } else {
//           mainHead = temp;
//           last = temp;
//         }
//       } else if (!list1 && list2) {
//         last.next = list2;
//         break;
//       } else if (!list2 && list1) {
//         last.next = list1;
//         break;
//       } else {
//         break;
//       }
//       // if (list1?.next) {
//       //   list1 = list1.next;
//       // } else {
//       //   last.next = list2;
//       //   break;
//       // }
//       // if (list2?.next) {
//       //   list2 = list2.next;
//       // } else {
//       //   last.next = list1;
//       //   break;
//       // }
//     }
//     return mainHead;
//   }
//   if (!list1) return list2;
//   if (!list2) return list1;
//   return null;
// };

// 2) Configure test parameters
// export const mergeTwoListsTestCases: MergeTwoListsTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMergeTwoLists = (
//   testCase: MergeTwoListsTestCase = mergeTwoListsTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = mergeTwoLists(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
