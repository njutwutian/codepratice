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
    if(s.length == 0) {
        return 0;
    }
    let max = 0;
    for (let index = 0; index < s.length; index++) {
        let temp = "";
        for (let end = index; end < s.length; end++) {
            const element = s[end];
            if (temp.indexOf(element) > -1) {
                max = temp.length > max ? temp.length : max;
                break;
            } else {
                temp += s[end];
                max = temp.length > max ? temp.length : max;
            }
        }
    }
    return max;
};
let result = lengthOfLongestSubstring("abcabcbb");
// console.log(result);
// 执行用时：
// 416 ms
// , 在所有 JavaScript 提交中击败了
// 10.87%
// 的用户
// 内存消耗：
// 44.1 MB
// , 在所有 JavaScript 提交中击败了
// 21.13%
// 的用户