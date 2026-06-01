/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
    if (n <= 0) {
        return false;
    }

    let temp = 1;
    let index = 0;
    while (temp != n) {
        if (temp < n) {
            if (index < 16) {
                temp = temp << 2;
                index++ ;
            } else {
                return false;
            }
        } else if (temp > n) {
            return false;
        }
    }
    return true;
};
// for (let index = 1; index < 16; index++) {
//     let temp = 4**index;
//     console.log(temp,"--",isPowerOfFour(temp));
// }
// console.log("==============",);
// for (let index = 1; index < 100; index++) {
//     console.log(index,"--",isPowerOfFour(index));
    
// }
// let a = 1162261466;
//1162261466
//1073741824
// console.log(a << 2);
console.log(isPowerOfFour(1162261466));