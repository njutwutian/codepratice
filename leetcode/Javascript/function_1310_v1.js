// 有一个正整数数组 arr，现给你一个对应的查询数组 queries，其中 queries[i] = [Li, Ri]。
// 对于每个查询 i，请你计算从 Li 到 Ri 的 XOR 值（即 arr[Li] xor arr[Li+1] xor ... xor arr[Ri]）作为本次查询的结果。
// 并返回一个包含给定查询 queries 所有结果的数组。

// 示例 1：
// 输入：arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
// 输出：[2,7,14,8] 
// 解释：
// 数组中元素的二进制表示形式是：
// 1 = 0001 
// 3 = 0011 
// 4 = 0100 
// 8 = 1000 
// 查询的 XOR 值为：
// [0,1] = 1 xor 3 = 2 
// [1,2] = 3 xor 4 = 7 
// [0,3] = 1 xor 3 xor 4 xor 8 = 14 
// [3,3] = 8
// 示例 2：
// 输入：arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
// 输出：[8,0,4,4]

// 提示：
// 1 <= arr.length <= 3 * 10^4
// 1 <= arr[i] <= 10^9
// 1 <= queries.length <= 3 * 10^4
// queries[i].length == 2
// 0 <= queries[i][0] <= queries[i][1] < arr.length

// [A, B, C, D]
// [A, AeB, AeBeC, AeBeCeD]

var xorQueries = function(arr, queries) {
    var result = [];
    for (let index = 1; index < arr.length; index++) {
        arr[index] = arr[index -1] ^ arr[index];
    }
    for (let index = 0; index < queries.length; index++) {
        var node = queries[index];
        if (node[0] > 0) {
            result.push(arr[node[1]] ^ arr[node[0] - 1]);
        } else {
            result.push(arr[node[1]]);
        }
    }
    return result;  
}
// [1,3,4,8]
// AeBeC = BeCeA
// var arr = xorQueries([1,3,4,8], null);
console.log(xorQueries([1,3,4,8], [[0,1],[1,2],[0,3],[3,3]]));
console.log(xorQueries([4,8,2,10], [[2,3],[1,3],[0,0],[0,3]]));
// 执行用时：
// 132 ms
// , 在所有 JavaScript 提交中击败了
// 84.85%
// 的用户
// 内存消耗：
// 52.4 MB
// , 在所有 JavaScript 提交中击败了
// 30.30%
// 的用户