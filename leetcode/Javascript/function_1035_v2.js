/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxUncrossedLines = function(nums1, nums2) {
    let map = new Map();
    let tempArray, targetArray;
    if (nums1.length > nums2.length) {
        tempArray = nums1
        targetArray = nums2;
    } else {
        tempArray = nums2;
        targetArray = nums1;
    }

    for (let index = 0; index < tempArray.length; index++) {
        const element = tempArray[index];
        if (map.has(element)) {
            let a = map.get(element);
            map.set(element, a.concat(index));
        } else {
            map.set(element, [index]);
        }
    }

    let max = 0;
    let result = new Array(targetArray.length+1).fill(0);
    let tempindex = -1;
    let tempResult = 0;
    for (let i = 0; i < targetArray.length; i++) {
        let element = targetArray[i];
        if (map.has(element)) {
            let temp = map.get(element);
            let flag = false;
            for (let j = 0; j < temp.length; j++) {
                if (temp[j] > tempindex) {
                    tempindex = temp[j];
                    flag = true;
                    break;
                }
            }
            if (flag) {
                result[i + 1] = result[i] + 1;
            }
        }else{
            result[i+1] = result[i]
        }
    }
    console.log(map);
    console.log(result);
    return max;
};

var search = function(nums1, nums2, map,start1, start2) {
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
// nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
// nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
nums1 = [3,1,4,1,1,3,5,1,2,2], nums2 = [4,1,5,2,1,1,1,5,3,1,1,1,2,3,1,4,3,5,5,3,1,2,3,2,4,1,1,1,5,3]
console.log(maxUncrossedLines(nums1, nums2));

// let a = [1,2,3,4]
// let b = a;
// b[0] = 4;
// console.log(a);