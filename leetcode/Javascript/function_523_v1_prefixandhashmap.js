/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
    let len = nums.length;
    if (len < 2) {
        return false
    }
    let map = new Map();
    map.set(0, -1);
    let temp = 0;
    for (let i = 0; i < len; i++) {
        temp = (temp + nums[i]) % k;
        if (map.has(temp)) {
            if (i - map.get(temp) > 1) {
                return true;
            }
        } else {
            map.set(temp, i);
        }
    }
    return false;
};

console.log(checkSubarraySum([23, 2, 4, 6, 6], 7));