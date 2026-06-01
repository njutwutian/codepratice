/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let far = nums[0];
    let last = nums.length - 1;
    for (let i = 0; i < last; i++) {
        if (i > far) {
            return false;
        }
        if (far >= last) {
            return true;
        }
        if ((i + nums[i]) > far) {
            far = i + nums[i];
        }
    }
    return last <= far;
};

console.log(canJump([0]));
console.log(canJump([8, 0, 0, 3, 2]));
console.log(canJump([1, 0, 1]));
console.log(canJump([3, 2, 1, 0, 4]));
console.log(canJump([2, 3, 1, 1, 4]));