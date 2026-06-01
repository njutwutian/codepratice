/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var checkSubarraySum = function(nums, k) {
    for (let i = 0; i < nums.length - 1; i++) {
        let tempSum = nums[i];
        for (let j = i+1; j < nums.length; j++) {
            tempSum += nums[j];
            if ((tempSum > k-1 || tempSum == 0) && tempSum % k == 0) {
                return true;
            }
        }
    }
    return false;
};

console.log(checkSubarraySum([23,2,4,6,6],7));