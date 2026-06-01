/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minChanges = function(nums, k) {
    if (k == 1) {
        return nums.reduce((a, b) => {
            return b != 0 ? a+1 : a
        }, 0)
    }
    let numbMap = new Map();
    for (let i = 0; i < k; i++) {
        let tempMap = new Map();
        numbMap.set(i, tempMap);
    }
    let numbModeArray = new Array(k).fill(-1);
    let numbModeCountArray = new Array(k).fill(-1);
    let numbLength = new Array(k).fill(0);
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        numbLength[index]++;
        const element = nums[i];
        let currentMap = numbMap.get(index);

        if (currentMap.has(element)){
            currentMap.set(element, currentMap.get(element) + 1);
        } else {
            currentMap.set(element, 1);
        }
        if (currentMap.get(element) > numbModeCountArray[index]) {
            numbModeArray[index] = element;
            numbModeCountArray[index] = currentMap.get(element);
        }

        if (index+1 == k) {
            index = 0;
        } else {
            index++;
        }
    }

    let modeXORSum = numbModeArray.reduce((a,b) => a^b);
    let minResult = 9007199254740991;
    for (let i = 0; i < k; i++) {
        let currentMap = numbMap.get(i);
        console.log("=======changeto===============");
        let target =  modeXORSum ^ numbModeArray[i];
        console.log(target, "modeXORSum ", modeXORSum);
        console.log("=======changeto===============");
        let needChange = 0;
        if (currentMap.has(target)){
            needChange = numbLength[i] - currentMap.get(target);
        } else {
            needChange = numbLength[i];
        }
        for (let j = 0; j < k; j++) {
            if (i != j) {
                needChange += numbLength[j] - numbModeCountArray[j];
            }
        }
        if (needChange < minResult) {
            minResult = needChange;
        }
        console.log("======================");
        console.log("result: ", minResult, " index: ", i);
        console.log("======================");
    }
    console.log("======================");
    console.log(numbMap);
    console.log("======================");
    console.log(numbModeArray);
    console.log("======================");
    console.log(numbModeCountArray);
    console.log("======================");
    console.log(numbLength);
    console.log("======================");  

    return minResult
};
let re = minChanges([26,19,19,28,13,14,6,25,28,19,0,15,25,11], 3)
console.log("result: ", re);

// console.log("======================");
// console.log(numbMap);
// console.log("======================");
// console.log(numbModeArray);
// console.log("======================");
// console.log(numbModeCountArray);
// console.log("======================");