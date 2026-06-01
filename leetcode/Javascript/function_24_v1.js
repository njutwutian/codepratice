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
    var index = head;
    if (index == null || index.next == null) {
        return index;
    }
    let temptop = top;
    while (index && index.next) {
        let indexNext = index.next;
        let nextOfnext = index.next.next;
        let headNode = new ListNode(indexNext.val,null);  
        index.next = nextOfnext;
        headNode.next = index;
        temptop.next = headNode;
        temptop = temptop.next.next;
        index = index.next;
    }
    return top.next;
};

let head = new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,new ListNode(5,new ListNode(6,null))))));
// console.log(head);
console.log("result: ",swapPairs(head));