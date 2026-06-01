/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
 var hammingDistance = function (x, y) {
    let result = x ^ y;
    let count = 0;
    while (result > 0) {
        count += result & 1;
        result >>= 1;
    }
    return count;
};
// var hammingDistance = function (x, y) {
//     let result = x ^ y;
//     let count = 0;
//     let str = parseInt(result).toString(2);
//     for (let i = 0; i < str.length; i++) {
//         count += str[i] == "1" ? 1 : 0;
//     }
//     return count;
// };

// var hammingDistance = function(x, y) {
//     let result = x ^ y;
//     let str = parseInt(result).toString(2);
//     let count = 0;
//     for (let i = 0; i < str.length; i++) {
//         count += str[i] == "1" ? 1 : 0;
//     }
//     return count;
// }; 
// 76ms

// var hammingDistance = function (x, y) {
//     let re = parseInt(x ^ y).toString(2).match(/[1]/g)
//     return re ? re.length:0;
// }; 
// 执行用时：
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 66.94%
// 的用户
// 内存消耗：
// 38 MB
// , 在所有 JavaScript 提交中击败了
// 33.61%
// 的用户
console.log(hammingDistance(1, 4));