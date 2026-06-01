package solution;

public class Solution_61_v1 {
    ListNode head;
    int k;
    public Solution_61_v1() {
        head = new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,new ListNode(5,new ListNode(6,null))))));
        k = 1;
    }

    public ListNode rotateRight() {
        ListNode top = new ListNode(0, head);
        ListNode last = top;
        int count = 0;
        while(last.next != null) {
            count++;
            last = last.next;
        }
        if (count == 0) {
            return top.next;
        }
        int move = k % count;
        if (move == 0) {
            return top.next;
        } else {
            ListNode preNewHead = top;
            ListNode newHead = head;
            last.next = head;
            int index = 1;
            while(index + move != count + 1) {
                preNewHead = newHead;
                newHead = newHead.next;
                index++;
            }
            preNewHead.next = null;
            return newHead;
        }
    }
}

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
