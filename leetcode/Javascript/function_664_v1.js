/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    if (s.length == 1) {
        return 1
    }
    let intMax = 9007199254740991;
    let result = new Array(s.length).fill(intMax).map(() =>{
        return new Array(s.length).fill(intMax)
    });
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (i == j) {
                result[i][j] = 1;
            } else {
                if (s[j] == s[j-1] || s[i] == s[j]) {
                    result[i][j] = result[i][j-1]
                } else {

                }
            }        
        }
        
    }
    console.log(result);
    return 1
};

var print = function(s, head) {
    if (s.length > 0) {
        let result = 0;
        if (head != s[0]) {
            head = s[0];
            result++;
        }
        let lastIndex = s.lastIndexOf(head);
        let left = print(s.substring(0, lastIndex + 1), head);
        let right = print(s.substring(lastIndex + 1), head);
        return result + left + right;
    } else {
        return 0;
    }
}

console.log(strangePrinter("aaa"));