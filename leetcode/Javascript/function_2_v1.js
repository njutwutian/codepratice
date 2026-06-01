// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例 1：
// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.
// 示例 2：
// 输入：l1 = [0], l2 = [0]
// 输出：[0]
// 示例 3：
// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]

// 提示：
// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零


//Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function AddListNode(node, val) {
    node.val = val;
    node.next = new ListNode;
    return node.next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let extra = false;
    let flag = true;
    let l1current = l1;
    let l2current = l2;
    let head = new ListNode();
    let currentNode = head;
    while (flag) {
        let extraValue = extra ? 1 : 0;
        let a = l1current ? l1current.val : 0;
        let b = l2current ? l2current.val : 0;
        let tempSum = a + b + extraValue;
        extra = tempSum > 9;
        l1current = l1current ? l1current.next : null;
        l2current = l2current ? l2current.next : null;
        flag = l1current || l2current || extra;
        currentNode.val = tempSum % 10;
        if (flag) {
            currentNode.next = new ListNode();
            currentNode = currentNode.next;
        }
    }

    return head;
};

var convertArrayToListNode = function (array) {
    let head = new ListNode();
    let currentNode = head; 
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        currentNode.val = element;
        if (index < array.length - 1) {
            currentNode.next = new ListNode();
            currentNode = currentNode.next;
        }
    }
    return head;
}

let b = convertArrayToListNode([0]);
let a = convertArrayToListNode([0]);
console.log(addTwoNumbers(a, b));

// 执行用时：
// 148 ms
// , 在所有 JavaScript 提交中击败了
// 47.66%
// 的用户
// 内存消耗：
// 42.8 MB
// , 在所有 JavaScript 提交中击败了
// 80.07%
// 的用户