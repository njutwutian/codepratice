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
    let result = new Array(len + 1).fill(0).map(() => {
        return new Array(width + 1).fill(0);
    });
    result[0][0] = 1;

    for (let i = 1; i < result.length; i++) {
        for (let j = 0; j < result[0].length; j++) {
            let numb = nums[i - 1];
            if (j < numb) {
                result[i][j] = result[i - 1][j];
            } else {
                result[i][j] = result[i - 1][j] + result[i - 1][j - numb];
            }
        }
    }
    return result[len][width];
};
console.log(
    findTargetSumWays([1, 1, 1, 1, 1], 3)
);