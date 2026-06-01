// 540. 有序数组中的单一元素
// 给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

// 示例 1:

// 输入: [1,1,2,3,3,4,4,8,8]
// 输出: 2
// 示例 2:

// [1,2,2,3,3,4,4,8,8] 

// 输入: [3,3,7,7,10,11,11]
// 输出: 10
// 注意: 您的方案应该在 O(log n)时间复杂度和 O(1)空间复杂度中运行。

// 执行用时：
// 0 ms
// , 在所有 Java 提交中击败了
// 100.00%
// 的用户
// 内存消耗：
// 38.1 MB
// , 在所有 Java 提交中击败了
// 98.89%
// 的用户

package solution;

public class Solution_540 {
    public int singleNonDuplicate(int[] nums) {
        return divArray(nums, 0, nums.length - 1); 
    }

    public int divArray(int[] nums, int start, int end) {
        if (start == end) {
            return nums[start];
        }
        int mid = (start + end) / 2;
        if (nums[mid] != nums[mid+1] && nums[mid] != nums[mid-1]) {
            return nums[mid];
        }
        if (nums[mid] == nums[mid-1] && (mid - start + 1) % 2 == 0) {
            // right
            return divArray(nums, mid + 1, end);
        } 
        if (nums[mid] == nums[mid-1] && (mid - start + 1) % 2 != 0) {
            // left
            return divArray(nums, start, mid);
        }
        if (nums[mid] == nums[mid+1] && (end - mid + 1) % 2 == 0) {
            // left
            return divArray(nums, start, mid -1);
        }
        if (nums[mid] == nums[mid+1] && (end - mid + 1) % 2 != 0) {
            // right
            return divArray(nums, mid, end);
        }
        return 0;
    }
}
