/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
    let len = nums.length;
    if (nums.length == 1) {
        return nums[0] == target ? 0 : -1;
    }
    if (nums[0] < nums[len-1]) {
        if ( target<nums[0] || target > nums[len -1] ) {
            return -1;
        } else {
            let index = 0;
            while(index < len) {
                if (target == nums[index]) {
                    return index;
                }
                index++;
            }
            return -1;
        }
    }
    if (nums[0] > nums[len-1]) {
        let index = 0;
        let count = 0;
        while(count < nums.length) {
            if (target == nums[index]) {
                return index;
            }
            if (target > nums[index]) {
                if (nums[index + 1] <nums[index]) {
                    return -1;
                } else {
                    if (target < nums[index +1]) {
                        return -1;
                    } else {
                        index++;
                    }
                }
            } else {
                if (index == 0) {
                    nextIndex = nums.length -1;
                    if (nums[nextIndex] < target) {
                        return -1;
                    } else {
                        index = nextIndex;
                    }
                } else {
                    nextIndex = index -1;
                    if (nums[nextIndex] > nums[index]) {
                        return -1;
                    } else {
                        if (nums[nextIndex] < target) {
                            return -1;
                        } else {
                            index = nextIndex;
                        }
                    }
                }
            }
            count++;
        }
    }
    return -1;
};

// var search = function(nums, target) {
//     return nums.indexOf(target);
// };