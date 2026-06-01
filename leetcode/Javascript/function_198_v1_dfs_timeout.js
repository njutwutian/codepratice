/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    let len = nums.length;
    if (len == 1) {
        return nums[0];
    }
    let result = new Array(len).fill(0);
    let dfs = (index, preResult) => {
        let currentResult = 0;
        if (index > -1 && index < len) {
            currentResult = preResult + nums[index];
            if (currentResult > result[index]) {
                result[index] = currentResult;
            }
        }
        if (index + 2 < len) {
            if (nums[index + 2] + currentResult > result[index + 2]) {
                dfs(index + 2, currentResult);
            }
        }
        if (index + 3 < len) {
            if (nums[index + 3] + currentResult > result[index + 3]) {
                dfs(index + 3, currentResult);
            }
        }
    }
    dfs(-2, 0);
    return Math.max(result[len - 2] ,result[len - 1]);
};
console.log(rob([2,7,9,3,1]));
// console.log(rob([226, 174, 214, 16, 218, 48, 153, 131, 128, 17, 157, 142, 88, 43, 37, 157, 43, 221, 191, 68, 206, 23, 225, 82, 54, 118, 111, 46, 80, 49, 245, 63, 25, 194, 72, 80, 143, 55, 209, 18, 55, 122, 65, 66, 177, 101, 63, 201, 172, 130, 103, 225, 142, 46, 86, 185, 62, 138, 212, 192, 125, 77, 223, 188, 99, 228, 90, 25, 193, 211, 84, 239, 119, 234, 85, 83, 123, 120, 131, 203, 219, 10, 82, 35, 120, 180, 249, 106, 37, 169, 225, 54, 103, 55, 166, 124]));