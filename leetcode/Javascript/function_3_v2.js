// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:
// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:
// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 示例 4:
// 输入: s = ""
// 输出: 0
//  

// 提示：
// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成

var lengthOfLongestSubstring = function(s) {
    if(s.length < 2) {
        return s.length;
    }
    let max = 0;
    let temp = s[0];
    for (let i = 1; i < s.length; i++) {
        let index = temp.indexOf(s[i]);
        temp += s[i];
        if (index > -1) {
            temp = temp.substring(index + 1);
        }
        max = temp.length > max ? temp.length : max;
    }
    return max;
};
let result = lengthOfLongestSubstring("pwwkew");
console.log(result);