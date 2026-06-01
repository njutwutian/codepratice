/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let isPositive = true;
    let max = 2147483648;
    let startParseInt = false;
    let first = true;
    let result = "0";
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        if ((charCode > 47 && charCode < 58) || 
            ((charCode == 43 ||
            charCode == 45) && first)) {
            if (first) {
                isPositive = charCode == 45 ? false : true;
                first = false;
            }
            startParseInt = true;
            result += (charCode > 47 && charCode < 58) ? s[i]: "";
        } else {
            if (startParseInt || charCode!= 32) {
                break;
            }
        }
    }
    let resultNumber = parseInt(result);
    if (isPositive) {
        resultNumber = resultNumber > max - 1 ? max - 1: resultNumber;
    } else {
        resultNumber = resultNumber > max ? 0-max: 0-resultNumber;
    }
    return resultNumber;
};
console.log(myAtoi("words and 987"));