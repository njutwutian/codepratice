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

    let result = [];
    let searchToEnd = function(str, length) {
        if (length == digits.length) {
            result.push(str);
        }

        let currentMap = map[digits[length]];
        for (const key in currentMap) {
            searchToEnd(str+currentMap[key], length+1);
        }
    }
    searchToEnd("", 0);
    return result;
};

console.log(letterCombinations("2"));

// 执行用时：
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 36.90%
// 的用户
// 内存消耗：
// 37.7 MB
// , 在所有 JavaScript 提交中击败了
// 83.65%
// 的用户