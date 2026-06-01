/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var printNode = function(node,title){
    console.log("=========="+title+"==========");
    while (node.next) {
        console.log(node.val);
        node = node.next
    }
    console.log("=========="+title+"==========");
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    let top = new ListNode(0, head);
    let last = top;
    let count = 0;
    while(last.next) {
        count++;
        last = last.next;
    }
    if (count == 0) {
        return top.next;
    }
    let move = k % count;
    if (move == 0) {
        return top.next;
    } else {
        let preNewHead = top;
        let newHead = head;
        last.next = head;
        let index = 1;
        while(index + move != count + 1) {
            preNewHead = preNewHead.next;
            newHead = newHead.next;
            index++;
        }
        preNewHead.next = null
        return newHead;
    }
};

var rotateRight = function(head, k) {
    if (k === 0 || !head || !head.next) {
        return head;
    }
    let n = 1;
    let cur = head;
    while (cur.next) {
        cur = cur.next;
        n++;
    }

    let add = n - k % n;
    if (add === n) {
        return head;
    }

    cur.next = head;
    while (add) {
        cur = cur.next;
        add--;
    }

    const ret = cur.next;
    cur.next = null;
    return ret;
};
let weiba = new ListNode(6,null);
let pre = new ListNode(5,weiba);
let head = new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,pre))));
// weiba.next = head;
// let temp = weiba;
// let aindex = 1;
// // printNode(weiba,"result");
// while (aindex != 6) {
//     temp = temp.next;
//     aindex ++;
// }
// temp.next = null;
// console.log(weiba);
// printNode(weiba,"result");
// console.log(rotateRight(head,2));
// console.log(rotateRight(head,3));
// console.log(rotateRight(head,4));
// console.log(rotateRight(head,5));
// console.log(rotateRight(head,6));



let t = rotateRight(head,1);
printNode(t,"result");
