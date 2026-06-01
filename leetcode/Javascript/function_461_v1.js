/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let longStr, shortStr
    if (x > y) {
        longStr = parseInt(x).toString(2)
        shortStr = parseInt(y).toString(2)
    } else {
        longStr = parseInt(y).toString(2)
        shortStr = parseInt(x).toString(2)
    }
    let count = 0;
    let index = 0;
    while (longStr.length > index) {
        let numb1 = longStr[longStr.length - index - 1];
        let numb2 = 0;
        if (shortStr.length - index > 0) {
            numb2 = shortStr[shortStr.length - index - 1]
        }
        count += numb1!=numb2 ? 1: 0;
        index++;
    }
    return count;
};
console.log(hammingDistance(1,4));