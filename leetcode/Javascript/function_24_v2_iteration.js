/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let top = new ListNode(0,head);
    let temptop = top;
    while (temptop.next && temptop.next.next) {
        let node1 = temptop.next;
        let node2 = temptop.next.next; 
        temptop.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temptop = node1;
    }
    return top.next;
};

let head = new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,new ListNode(5,new ListNode(6,null))))));
// console.log(head);
console.log("result: ",swapPairs(head));