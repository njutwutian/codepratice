/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if (nums.length == 1) {
        return true;
    }
    let len = nums.length;
    let last = len -2;
    let target = len -1;
    while(last != 0 ) {
        if ((nums[last] + last) >= target) {
            target = last;
            last--;
        } else {
            while ((nums[last] + last) < target && last > 0) {
                last--;
            }
        }
    }
    return (nums[last] + last) >= target;
};

console.log(canJump([0]));
console.log(canJump([8,0,0,3,2]));
console.log(canJump([1,0,1]));
console.log(canJump([3,2,1,0,4]));
console.log(canJump([2,3,1,1,4]));