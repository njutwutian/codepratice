var fs = require('fs');
/**
 * @param {number} n
 * @return {string[]}
 */
var test = function (n) {
    let result = new Array(n + 1);
    result[0] = [""];
    for (let i = 1; i < n + 1; i++) {
        let tempResult = [];
        result[i - 1].map(x => {
            tempResult.push("(" + x + ")");
        });
        for (let k = 1; k <= i -1; k++) {
            let left = result[k];
            let right = result[i - k];
            left.map(x => {
                right.map(y => {
                    let temp = x + y;
                    if (tempResult.indexOf(temp) == -1) {
                        tempResult.push(temp);
                    }
                })
            })
        }
        result[i] = tempResult.sort();
    }
    return result;
};
var x = test(8);
fs.writeFile("output1.txt",JSON.stringify(x), ()=> {});

/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function (n) {
    let result = new Array(n + 1);
    result[0] = [""];
    for (let i = 1; i < n + 1; i++) {
        let tempResult = [];
        result[i - 1].map(x => {
            tempResult.push("(" + x + ")");
        });
        for (let k = 1; k <= i -1; k++) {
            let left = result[k];
            let right = result[i - k];
            left.map(x => {
                right.map(y => {
                    let temp = x + y;
                    if (tempResult.indexOf(temp) == -1) {
                        tempResult.push(temp);
                    }
                })
            })
        }
        result[i] = tempResult;
    }
    return result[n];
};