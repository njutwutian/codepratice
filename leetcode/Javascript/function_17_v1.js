/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (digits.length == 0) {
        return [];
    }
    let map = {
        "2": ["a","b","c"],
        "3": ["d","e","f"],
        "4": ["g","h","i"],
        "5": ["j","k","l"],
        "6": ["m","n","o"],
        "7": ["p","q","r","s"],
        "8": ["t","u","v"],
        "9": ["w","x","y","z"],
    }
    return appendStr(digits.substring(1), map[digits[0]], map);
};
var appendStr = function(str, array, map) {
    if (str.length == 0) {
        return array;
    }
    let currentMap = map[str[0]];
    let result = new Array(currentMap.length * array.length).fill("");
    for (let i = 0; i< array.length; i++) {
        for (let j = 0; j < currentMap.length; j++) {
            result[i*currentMap.length + j] = array[i] + currentMap[j];
        } 
    }
    return appendStr(str.substring(1), result, map);
}

console.log(letterCombinations("232"));

// 执行用时：
// 100 ms
// , 在所有 JavaScript 提交中击败了
// 9.21%
// 的用户
// 内存消耗：
// 37.9 MB
// , 在所有 JavaScript 提交中击败了
// 37.28%
// 的用户