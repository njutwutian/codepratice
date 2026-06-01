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
    let start = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {        
            if (isPalindromic(s, i, j) && (j-i) > (end-start)) {
                start = i;
                end = j; 
            }
        }
    }
    return s.substring(start, end+1);
};

var isPalindromic = function(temp, start, end) {
    while (start < end) {
        if (temp[start] != temp[end]) {
            return false;
        }
        start++;
        end--; 
    }
    return true;
}
// console.log(isPalindromic("ababababababa", 0, "ababababababa".length -1));
// console.log(isPalindromic("bd", 0, "bd".length-1));
// console.log(isPalindromic("aacabdkacaa", 0, "aacabdkacaa".length -1));
console.log(longestPalindrome("a"));
//"ababababababa"
//ababababababa