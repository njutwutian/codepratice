/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minChanges = function (nums, k) {
    let numbMap = new Map();
    for (let i = 0; i < k; i++) {
        let tempMap = new Map();
        numbMap.set(i, tempMap);
    }
    let index = 0;
    let numbLength = new Array(k).fill(0);
    for (let i = 0; i < nums.length; i++) {
        numbLength[index]++;
        const element = nums[i];
        let currentMap = numbMap.get(index);
        if (currentMap.has(element)) {
            currentMap.set(element, currentMap.get(element) + 1);
        } else {
            currentMap.set(element, 1);
        }
        if (index + 1 == k) {
            index = 0;
        } else {
            index++;
        }
    }

    let numbMax = 1024;
    let intMax = 9007199254740991;
    let result = new Array(k).fill(intMax).map(() => {
        return new Array(numbMax).fill(intMax);
    });
    for (let i = 0; i < k; i++) {
        let currentMap = numbMap.get(i);
        let lastMin = i > 0 ? Math.min(...result[i - 1]) : intMax;
        for (let j = 0; j < numbMax; j++) {
            let tempMin = intMax;
            if (i == 0) {
                if (currentMap.has(j)) {
                    tempMin = numbLength[i] - currentMap.get(j);
                } else {
                    tempMin = numbLength[i];
                }
            } else {
                let temp1;
                currentMap.forEach((value, key) => {
                    temp1 = result[i - 1][j ^ key] + numbLength[i] - value
                    if (temp1 < tempMin) {
                        tempMin = temp1;
                    }
                });
                let temp2;
                temp2 = lastMin + numbLength[i];
                if (temp2 < tempMin) {
                    tempMin = temp2;
                }
            }
            result[i][j] = tempMin;
        }
    }
    return result[k - 1][0]
};
let re = minChanges([1, 2, 4, 1, 2, 5, 1, 2, 6], 1)
console.log("result: ", re);

// console.log("======================");
// console.log(numbMap);
// console.log("======================");
// console.log(numbModeArray);
// console.log("======================");
// console.log(numbModeCountArray);
// console.log("======================");