/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    let len = nums.length;
    let result = 0;
    let dfs = (preSum, index, plus) => {
        let temp = plus ? nums[index]: 0-nums[index];
        if (index == len - 1) {
            result += (preSum + temp) == target;
            return; 
        }
        let tempSum = preSum + temp;
        dfs(tempSum, index + 1, true);
        dfs(tempSum, index + 1, false);
    }
    dfs(0, 0, true);
    dfs(0, 0, false);
    return result;
};
console.log(
    findTargetSumWays([1,1,1,1,1], 3)
);