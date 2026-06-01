/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 var convert = function(s, numRows) {
    if (numRows == 1) {
        return s;
    }
    let result = new Array(numRows).fill("");
    let index = 0;
    let flag = true;
    for (let i = 0; i < s.length; i++) {
        result[index] += s[i];
        if (flag) {
            if (index == numRows -1) {
                index--;
                flag = false;
            } else {
                index++;
            }
        } else {
            if (index == 0) {
                index++;
                flag = true;
            } else {
                index--;
            }
        }
    }
    return result.join('');
};

console.log(convert("ab",1));
//PAHNAPLSIIGYIRPINALSIGYAHRPI
//PAHNAPLSIIGYIRPINALSIGYAHRPI