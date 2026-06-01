/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    let intMax = 9007199254740991;
    let result = new Array(s.length).fill(intMax).map(() =>{
        return new Array(s.length).fill(intMax)
    });
    for (let i = s.length - 1; i > -1; i--) {
        for (let j = i; j < s.length; j++) {
            
            if (i == j) {
                result[i][j] = 1;
            } else {
                let tempMin = intMax;
                if (s[j] == s[j - 1] || s[j] == s[i]) {
                    tempMin = result[i][j - 1];
                } else {
                    for (let k = i; k < j; k++) {
                        let tempCount = result[i][k] + result[k+1][j];
                        if (tempCount < tempMin) {
                            tempMin = tempCount;
                        }
                    }
                }
                result[i][j] = tempMin;
            }        
        }      
    }
    return result[0][s.length -1]
};
// console.log(result);
// console.log("=============i=",i,"==j=",j,"=k=",k,"===tempCount=",tempCount,"===");
console.log(strangePrinter("a"));