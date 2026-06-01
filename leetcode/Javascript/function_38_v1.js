/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let say = (x) => {
        let temp = x[0]
        let index = 0;
        result = "";
        for (let i = 0; i < x.length; i++) {
            if (x[i] == temp) {
                index++;
            } else {
                result = result + index + temp;
                temp = x[i];
                index = 1;
            }
        }
        result = result + index + temp;
        return result;
    }

    let resultStr = "1";

    while(n > 1) {
        resultStr = say(resultStr);
        n--;
    }

    return resultStr;
};

console.log(countAndSay(10));

