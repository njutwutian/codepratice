/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let result = [];
    let generate = (current, x) => {
        if(x==0) {
            if (valid(current)) {
                result.push(current);
            }
            return;
        } else {
            generate(current + "(", x - 1);
            generate(current + ")", x - 1);
        }
    }

    let valid = (str) => {
        if (str[0] == ")") {
            return false
        } else {
            let balance = 0;
            for (let index = 0; index < str.length; index++) {
                let element = str[index];
                if (element == "(") {
                    balance++;
                } else {
                    balance--;
                }
                if (balance < 0) {
                    return false;
                }
            }
            return balance == 0;
        }
    }
    generate("", n * 2);
    return result;
};
 console.log(generateParenthesis(4));
