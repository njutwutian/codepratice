/**
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {
    let xorArray = [];
    xorArray[0] = 0;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        xorArray[i+1] = xorArray[i] ^ element;
    }
    let result = 0;
    for (let i = 1; i < xorArray.length; i++) {
        const left = xorArray[i -1];
        for (let k = i+1; k < xorArray.length; k++) {
            const right = xorArray[k];
            if (left == right) {
                result += k - i;
                console.log(i,"-",k);
            }
        }
    }
    return result;
};

console.log(countTriplets([1,1,1,1,1]));

// 执行用时：
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 80.00%
// 的用户
// 内存消耗：
// 37.7 MB
// , 在所有 JavaScript 提交中击败了
// 83.33%
// 的用户