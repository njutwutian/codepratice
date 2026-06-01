
//  * Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/*
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let root = new ListNode(0, head);
    let current = root;
    while (n>1) {
        head = head.next;
        n--;
    }
    while (head.next) {
        head = head.next;
        current = current.next;
    }
    current.next = current.next.next;
    return root.next;
};