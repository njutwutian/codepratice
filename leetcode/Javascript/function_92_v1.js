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
    let tempTop = top;
    let pre = top;
    let after = null;
    let stack = []
    let index = 0;
    while (tempTop.next) {
        tempTop = tempTop.next;
        index++;
        if (index == left - 1) {
            pre = tempTop;
        }
        if (index > left - 1 && index < right + 1) {
            stack.push(tempTop.val);
        }
        if (index == right + 1) {
            after = tempTop;
            break;
        }
    }
    let length = stack.length;
    for (let i = 0; i < length; i++) {
        pre.next = new ListNode(stack.pop(),null);
        pre = pre.next;
        
    }
    pre.next = after;
    return top.next;
};

let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, null))))));
console.log(reverseBetween(head, 2, 3));
// let temp = head.next;
// temp = temp.next
// let temp1 = temp;
// let temp2 = temp.next
// console.log(temp1);
// console.log(temp2);


