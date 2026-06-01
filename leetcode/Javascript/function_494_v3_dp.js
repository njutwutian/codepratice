/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    let len = nums.length;
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    let diff = sum - target;
    if (diff < 0 || diff & 1 == 1) {
        return 0;
    }
    let width = diff / 2;
    let pre = new Array(width + 1).fill(0);
    pre[0] = 1;
    for (let i = 1; i < len + 1; i++) {
        let current = new Array(width + 1).fill(0);
        for (let j = 0; j < width + 1; j++) {
            let numb = nums[i - 1];
            if (j < numb) {
                current[j] = pre[j];
            } else {
                current[j] = pre[j] + pre[j - numb];
            }
        }
        pre = current;
    }
    return pre[width];
};
console.log(
    findTargetSumWays([1, 1, 1, 1, 1], 3)
);