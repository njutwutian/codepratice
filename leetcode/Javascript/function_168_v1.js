/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
    let result = "";
    let cal = (numb) => {
        if (numb < 1) {
            return;
        }
        if (numb < 27) {
            result = String.fromCharCode(numb + 64) + result;
        } else {
            let temp = numb % 26;
            let left = numb / 26;
            if (temp == 0) {
                result = "Z" + result;
                cal(left - 1);
            } else {
                result = String.fromCharCode(temp + 64) + result;
                cal(left);
            }
        }
    }
    cal(columnNumber);
    return result;
};