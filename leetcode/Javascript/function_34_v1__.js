/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let result = [-1, -1]
    let start = 0;
    let end = nums.length - 1;
    let middle = parseInt((start + end) / 2);
    while (nums[start] != target && nums[end] != target) {
        if (nums[start] < target) {
            start = parseInt((start + middle) / 2);
        }
        if (nums[start] == target ) {

        }
    }
    return middle;
};
var searchMin = function(nums, start, end,target) {
    if (nums[end] < target) {
        return -1;
    }
    if (nums[start] == target && start == 0) {
        return start;
    }
    if (start >0 && target> nums[start-1] && nums[start] == target) {
        return start
    }
    if (nums[start] <= target) {
        start = parseInt((start + end) /2);
    } else {
        start = parseInt((start + end) /2);
    }
    return searchMin();
}

console.log(searchRange([5,7,7,8,8,10],8));