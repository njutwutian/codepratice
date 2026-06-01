/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let result = [];
    if (nums.length < 3) {
        return result;
    }
    nums.sort((a, b) => a - b);
    console.log(nums);
    let left = 0;
    let right = nums.length - 1;
    let mid = left + 1;
    let map = new Map();
    while (left + 1 < right && mid < right) {
        if (nums[left] + nums[mid] + nums[right] > 0) {
            right--;
        } else if (nums[left] + nums[mid] + nums[right] == 0) {
            let key = "" + nums[left] + nums[mid] + nums[right];
            if (!map.has(key)) {
                result.push([nums[left], nums[mid], nums[right]]);
                map.set(key,1);
            }
            if (nums[left + 1] - nums[left] < nums[right] - nums[right -1]) {
                left++;
            } else {
                right--;
            }
            mid = left + 1;
        } else {
            if (mid + 1 == right) {
                left++;
                mid = left + 1;
            } else {
                mid++;
            }
        }
    }
    return result;
};
// console.log(left, mid, right);
console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]));