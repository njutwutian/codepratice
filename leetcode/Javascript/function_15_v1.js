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
    let map = new Map();
    for (let left = 0; left < nums.length - 2; left++) {
        let right = nums.length - 1;
        let mid = left + 1;
        if(nums[left] == nums[left - 1]) {
            continue;
        }
        while (mid < right) {
            if (nums[left] + nums[right] + nums[right - 1] < 0 ||
                nums[left] + nums[left + 1] + nums[left + 2] > 0) {
                break;
            }
            let sum = nums[left] + nums[mid] + nums[right];
            if (sum > 0) {
                right--;
            } else if (sum == 0){
                let key = "" + nums[left] + nums[mid] + nums[right];
                if (!map.has(key)) {
                    result.push([nums[left], nums[mid], nums[right]]);
                    map.set(key,1);
                }
                right--;
            } else {
                mid++;
            }
        }
    }
    return result;
};
// console.log(left, mid, right);
console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]));