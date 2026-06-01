/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let result = [];
    let generate = (current, left, right) => {
        if (current.length == n * 2) {
            result.push(current);
            return;
        }

        if (left < n) {
            generate(current + "(", left + 1, right);
        }
        if (right < left) {
            generate(current + ")", left, right + 1);
        }
    }
    generate("", 0, 0);
    return result;
};
console.log(generateParenthesis(4));
