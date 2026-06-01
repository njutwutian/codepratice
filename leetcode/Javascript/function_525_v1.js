/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    let result = 0;
    let sum = 0;
    let map = new Map();
    map.set(0, -1);
    for (let i = 0; i < nums.length; i++) {
        let temp = nums[i] == 0 ? -1 : 1;
        sum += temp;
        if (map.has(sum)) {
            let pre = map.get(sum);
            if (i - pre > result) {
                result = i - pre;
            }
        } else {
            map.set(sum, i);
        }
    }
    return result;
};