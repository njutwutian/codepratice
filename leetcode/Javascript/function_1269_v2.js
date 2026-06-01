// 有一个长度为 arrLen 的数组，开始有一个指针在索引 0 处。
// 每一步操作中，你可以将指针向左或向右移动 1 步，或者停在原地（指针不能被移动到数组范围外）。
// 给你两个整数 steps 和 arrLen ，请你计算并返回：在恰好执行 steps 次操作以后，指针仍然指向索引 0 处的方案数。
// 由于答案可能会很大，请返回方案数 模 10^9 + 7 后的结果。

// 示例 1：
// 输入：steps = 3, arrLen = 2
// 输出：4
// 解释：3 步后，总共有 4 种不同的方法可以停在索引 0 处。
// 向右，向左，不动
// 不动，向右，向左
// 向右，不动，向左
// 不动，不动，不动
// 示例  2：
// 输入：steps = 2, arrLen = 4
// 输出：2
// 解释：2 步后，总共有 2 种不同的方法可以停在索引 0 处。
// 向右，向左
// 不动，不动
// 示例 3：

// 输入：steps = 4, arrLen = 2
// 输出：8

// 提示：
// 1 <= steps <= 500
// 1 <= arrLen <= 10^6

/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
 var numWays = function(steps, arrLen) {
    // if (arrLen == 1) {
    //     return 1;
    // }
    // let x = 10 ** 9 + 7;
    // let r;
    // let min =  Math.min(steps/2 + 1, arrLen - 1);
    // let pre = new Array(arrLen).fill(0);
    // pre[0] = 1;
    // for (let i = 1; i <= steps; i++) {
    //     r = new Array(arrLen).fill(0);
    //     for (let j = 0; j <= min ; j++) {
    //         let left = j > 0 ? pre[j-1] : 0;
    //         let right = j < min ? pre[j+1] : 0
    //         let cur = pre[j]
    //         r[j] = (left + right + cur) % x;
    //     }
    //     pre = r;
    // }
    // return r[0];
    let mod = 10 ** 9 + 7
    let m = Math.min((steps / 2 | 0) + 1, arrLen)
    let dp = Array(steps + 1).fill(0).map(() => Array(m).fill(0))
    dp[0][0] = 1
    for (let i = 1; i <= steps; i++) {
        for (let j = 0; j < m; j++) {
            let left = j > 0 ? dp[i - 1][j - 1] : 0      
            let right = j < m - 1 ? dp[i - 1][j + 1] : 0
            let cur = dp[i - 1][j]
            dp[i][j] = (left + cur + right) % mod
        }
    }
    return dp[steps][0]
};
let time1 = new Date();
console.log(numWays(330,330));
let time2 = new Date();
console.log(time2-time1);