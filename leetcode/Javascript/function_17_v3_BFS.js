/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (digits.length == 0) {
        return [];
    }
    let map = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"],
    }

    let resultSequence = [""];
    let index = 0;
    let currentSequenceLength = 1;
    while (index < digits.length) {
        for (let i = 0; i < currentSequenceLength; i++) {
            let tempStr = resultSequence.shift();
            let currentCharacter = map[digits[index]];
            for (const key in currentCharacter) {
                resultSequence.push(tempStr + currentCharacter[key]);
            }
        }
        currentSequenceLength = resultSequence.length;
        index ++;
    }

    return resultSequence;
};

console.log(letterCombinations("23"));

// 执行用时：
// 84 ms
// , 在所有 JavaScript 提交中击败了
// 55.50%
// 的用户
// 内存消耗：
// 37.7 MB
// , 在所有 JavaScript 提交中击败了
// 81.91%
// 的用户