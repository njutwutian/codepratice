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
    let map = new Map();
    for (let i = 0; i < xorArray.length; i++) {
        const current = xorArray[i];
        if (map.has(current)) {
            map.get(current).map(x=>{
                result += i-1 -x;
            })
            map.set(current, map.get(current).concat(i))
        } else {
            map.set(current, [i]);
        }
    }
    return result;
};

console.log(countTriplets([1,3,5,7,9]));

// 执行用时：
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 96.67%
// 的用户
// 内存消耗：
// 39.7 MB
// , 在所有 JavaScript 提交中击败了
// 13.33%
// 的用户