// 给你一个字符串 s，找到 s 中最长的回文子串。

// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"
// 示例 3：
// 输入：s = "a"
// 输出："a"
// 示例 4：
// 输入：s = "ac"
// 输出："a"
//  

// 提示：
// 1 <= s.length <= 1000
// s 仅由数字和英文字母（大写和/或小写）组成

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length == 1) {
        return s;
    }
    let stack = [];
    let temp = "";
    let result = "";
    let isSingle = false;
    for (let index = 0; index < s.length; index++) {
        const element = s[index];
        if (temp.length == 0) {
            temp += element;
        } else {
            if (stack.length > 0 && stack[stack.length - 1] == element) {
                isSingle = false;
                temp = stack.pop() + temp + element;
            } else {
                if ((temp.length == 1 && element == temp) || (element == temp[0] && isSingle)) {
                    isSingle = true;
                    temp += element;
                } else {
                    isSingle = false;
                    temp += element;
                    let start = getTemp(temp, 0);
                    
                    for (let index = 0; index < start; index++) {
                        stack.push(temp[index]);
                    }
                    temp = temp.substring(start);
                }
            }
        }
        if (temp.length > result.length) {
            result = temp;
        }
    }
    return result;
};

var getTemp = function(temp, start) {
    if (isPalindromic(temp, start)) {
        return start;
    } else {
        start++;
        return getTemp(temp, start);
    }
}

var isPalindromic = function(temp, start) {
    let end = temp.length - 1;
    while (start < end) {
        if (temp[start] != temp[end]) {
            return false;
        }
        start++;
        end--; 
    }
    return true;
}
console.log(longestPalindrome("abababababababa"));
// 执行用时：
// 108 ms
// , 在所有 JavaScript 提交中击败了
// 93.41%
// 的用户
// 内存消耗：
// 44.5 MB
// , 在所有 JavaScript 提交中击败了
// 44.81%
// 的用户