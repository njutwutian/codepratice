/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let start = nums.indexOf(target);
    let end = nums.lastIndexOf(target);
    return [start,end]
};

console.log(searchRange([5,7,7,8,8,10],8));