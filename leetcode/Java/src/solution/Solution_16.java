package solution;
// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

import java.util.Arrays;

// 返回这三个数的和。

// 假定每组输入只存在恰好一个解。
// 示例 1：

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
// 示例 2：

// 输入：nums = [0,0,0], target = 1
// 输出：0
//  

// 提示：

// 3 <= nums.length <= 1000
// -1000 <= nums[i] <= 1000
// -104 <= target <= 104

public class Solution_16 {
    public int threeSumClosest(int[] nums, int target) {
        if (nums.length == 3) {
            return nums[0] + nums[1] + nums[2];
        }
        Arrays.sort(nums);
        if (target <= nums[0] + nums[1] + nums[2]) {
            return nums[0] + nums[1] + nums[2];
        }

        if (target >= nums[nums.length -1] + nums[nums.length -2] + nums[nums.length -3]) {
            return nums[nums.length -1] + nums[nums.length -2] + nums[nums.length -3];
        }
        int closeResult = nums[0] + nums[1] + nums[nums.length - 1];
        int minDiff = closeResult > target ? closeResult - target : target - closeResult;
        for (int i = 0; i < nums.length-2; i++) {
            int leftIndex = i+1;
            int rightIndex = nums.length - 1;
            while (leftIndex < rightIndex) {
                int currentSum = nums[i] + nums[leftIndex] + nums[rightIndex];
                int currentDiff;
                if (currentSum > target) {
                    currentDiff = currentSum - target;
                    rightIndex--;
                } else if (currentSum < target) {
                    currentDiff = target - currentSum;
                    leftIndex++;
                } else {
                    return currentSum;
                }
                if (currentDiff < minDiff) {
                    closeResult = currentSum;
                    minDiff = currentDiff;
                }
            } 
        }
        return closeResult;
    }
}