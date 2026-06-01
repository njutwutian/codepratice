/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        stack.push(element);
        
        if (element == ")"){
            let tempStr = [];
            let currentIndex = "";
            while (currentIndex != "(") {
                currentIndex = stack.pop();
                if (currentIndex != "(" && currentIndex != ")") {
                    tempStr.push(currentIndex);
                }
            }
            stack = stack.concat(tempStr);
        }
    }

    return stack.join('');
};

console.log(reverseParentheses("a(bcdefghijkl(mno)p)q"));