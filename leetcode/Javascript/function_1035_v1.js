/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxUncrossedLines = function(nums1, nums2) {
    let max = 0;
    for (let i = 0; i < nums1.length; i++) {
        let result = search(nums1, nums2, i, 0);
        if (result > max) {
            max = result;
        }
    }
    return max;
};

var search = function(nums1, nums2, start1, start2) {
    if (start1 < nums1.length && start2 < nums2.length) {
        let tempIndex = start2;
        while(tempIndex < nums2.length && nums1[start1] != nums2[tempIndex]) {
            tempIndex++;
        }
        if (tempIndex < nums2.length && nums1[start1] == nums2[tempIndex]) {
            let count1 = search(nums1,nums2, start1 +1, start2);
            let count2 = 1 + search(nums1,nums2, start1 +1, tempIndex +1);
            return count1 > count2 ? count1: count2;
        } else {
            return search(nums1, nums2, start1+1, start2);
        }
    } else {
        return 0;
    }
}
nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
// nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
// nums1 = [3,1,4,1,1,3,5,1,2,2], nums2 = [4,1,5,2,1,1,1,5,3,1,1,1,2,3,1,4,3,5,5,3,1,2,3,2,4,1,1,1,5,3]


console.log(maxUncrossedLines(nums1, nums2));