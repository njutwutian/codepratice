/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    let result = 0;
    let length = strs.length;
    let dfs = (zero, one, count, index) => {
        if (count > result) {
            result = count;
        }
        if (index == length) {
            return;
        }
        let element = strs[index];
        let elementOneCount = getOneCount(element);
        let elementZeroCount = element.length - elementOneCount;
        if (elementZeroCount <= zero && elementOneCount <= one) {
            // 选
            dfs(zero - elementZeroCount, one - elementOneCount, count + 1, index + 1);
            // 不选
            dfs(zero, one, count, index + 1);
        } else {
            // 不能选
            dfs(zero, one, count, index + 1);
        }
    }

    dfs(m, n, 0, 0);

    return result;
};

var getOneCount = function(str) {
    let count = 0;
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (element.charCodeAt() == 49) {
            count++;
        }
    }
    return count;
}

// let a = findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)
let a = findMaxForm(["11","11","0","0","10","1","1","0","11","1","0","111","11111000","0","11","000","1","1","0","00","1","101","001","000","0","00","0011","0","10000"], 90, 66)
console.log(a);