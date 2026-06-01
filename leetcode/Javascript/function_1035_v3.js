/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxUncrossedLines = function(nums1, nums2) {
    let result = new Array(nums1.length + 1).fill({count: 0, position:[-1,-1]}).map(() => new Array(nums2.length+1).fill({count: 0, position:[-1,-1]}));
    for(let i = 1; i< nums1.length + 1; i++) {
        let tempIndex = -1;
        let targetIndex = -1;
        for (let j = 1; j < nums2.length + 1; j++) {
            let temp = nums1[i -1];
            let target = nums2[j -1];
            if (temp == target) {
                let max = result[i][j-1].count > result[i-1][j].count ? result[i][j-1] : result[i-1][j];
                if (i > max.position[0] && j > max.position[1]) {
                    tempIndex = i;
                    targetIndex = j;
                    result[i][j] = {
                        count: Math.max(result[i-1][j].count, result[i-1][j].count) + 1,
                        position: [tempIndex, targetIndex]
                    }
                } else {
                    result[i][j] = {
                        count: max.count,
                        position: max.position
                    }
                }

            } else {
                if (result[i][j-1].count == result[i-1][j].count) {
                    // console.log(result[i][j-1].position);
                    if (result[i][j-1].count != 0) {
                        if (result[i][j-1].position[0] < result[i-1][j].position[0]) {
                            tempIndex = result[i][j-1].position[0];
                            targetIndex = result[i][j-1].position[1];
                        } else {
                            tempIndex = result[i-1][j].position[0];
                            targetIndex = result[i-1][j].position[1];
                        }
                        result[i][j] = {
                            count: result[i][j-1].count,
                            position: [tempIndex, targetIndex]
                        }
                    }
                } else {
                    let tempR = result[i][j-1].count > result[i-1][j].count ? result[i][j-1] : result[i-1][j];
                    tempIndex = tempR.position[0];
                    targetIndex = tempR.position[1];
                    result[i][j] = {
                        count: tempR.count,
                        position: [tempIndex, targetIndex]
                    }
                }
            }
        }
    }

    // console.log(result);
    return result[nums1.length][nums2.length].count;
};

// nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
// nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
// nums1 = [4,1,5,2,1,1,1,5,3,1,1,1,2,3,1,4,3,5,5,3,1,2,3,2,4,1,1,1,5,3]
nums2 = [3,1,4,1,1,3,5,1,2,2]
nums1 = [1,5,2,1,1,1,5,3,1,1,1,2,3,1,4,3,5,5,3,1,2,3,2,4,1,1,1,5,3]
console.log(maxUncrossedLines(nums2, nums1));
console.log(maxUncrossedLines(nums1, nums2));

// let a = [1,2,3,4]
// let b = a;
// b[0] = 4;
// console.log(a);