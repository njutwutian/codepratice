/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    if (left == right) {
        return head;
    }
    let top = new ListNode(0, head);
    let currentNode = top;
    let preLeft = top;
    let preCurrent = top;
    let index = 0;
    while (currentNode.next) {
        preCurrent = currentNode;
        currentNode = currentNode.next;
        index++;
        if (index == left - 1) {
            preLeft = currentNode;
        }
        if (index > left && index < right + 1) {
            preCurrent.next = currentNode.next;
            currentNode.next = preLeft.next;
            preLeft.next = currentNode;
            currentNode = preCurrent;
        }
        if (index == right + 1) {
            break;
        }
    }
    return top.next;
};

let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, null))))));
// console.log(head);
console.log(reverseBetween(head, 2, 3));
// let temp = head.next;
// temp = temp.next
// let temp1 = temp;
// let temp2 = temp.next
// console.log(temp1);
// console.log(temp2);


