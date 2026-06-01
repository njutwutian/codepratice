using System;
namespace Leetcode.CSharp
{
    /**
     * Definition for singly-linked list.
     */
    public class ListNode
    {
        public int val;
        public ListNode next;
        public ListNode(int val = 0, ListNode next = null)
        {
            this.val = val;
            this.next = next;
        }
    }

    public class SolutionP1290
    {
        /**
        * Runtime: 88 ms, faster than 75.55% of C# online submissions for Convert Binary Number in a Linked List to Integer.
        * Memory Usage: 25.1 MB, less than 15.05% of C# online submissions for Convert Binary Number in a Linked List to Integer.
        **/
        public int GetDecimalValue(ListNode head)
        {
            int sum = 0;
            int max = 0;
            ListNode index = head;
            while (index.next != null)
            {
                max++;
                index = index.next;
            }
            index = head;
            sum += (int)Math.Pow(2, max) * index.val;
            max--;
            while (index.next != null)
            {
                sum += (int)Math.Pow(2, max) * index.next.val;
                max--;
                index = index.next;
            }
            return sum;
        }

        /**
        *Runtime: 88 ms, faster than 75.55% of C# online submissions for Convert Binary Number in a Linked List to Integer.
        *Memory Usage: 24.5 MB, less than 88.71% of C# online submissions for Convert Binary Number in a Linked List to Integer.
        **/
        public int GetDecimalValue_v2(ListNode head)
        {
            int sum = 0;
            sum += head.val;
            while (head.next != null)
            {
                sum = sum * 2 + head.next.val;
                head = head.next;
            }
            return sum;
        }
    }
}