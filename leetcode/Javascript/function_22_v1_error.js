/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let result = ["()"]
    if (n == 1) {
        return result;
    }
    for (let i = 2; i < n + 1; i++) {
        let tempResult = []
        for (let j = 0; j < result.length; j++) {
            const element = result[j];
            // before
            tempResult.push("()"+element);
            // contain
            tempResult.push("("+element+")");
            // after
            let after = element + "()";
            if (tempResult.indexOf(after) == -1) {
                tempResult.push(after);
            }
        }
        console.log(tempResult);
        result = tempResult;
    }
    return result;
};

console.log(generateParenthesis(3));