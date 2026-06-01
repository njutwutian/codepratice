/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    if (n < 0) {
        return false;
    }
    if (n == 0) {
        return true;
    }

    let index = 1;
    let temp = 1;
    while (index <32) {
        if (temp == n) {
            return true;
        } else if (temp > n) {
            return false;
        } else if (n > temp && n - temp < temp) {
            return false;
        }
        temp = temp<<1;
        index++;
    }
};
console.log(isPowerOfTwo(1));
console.log(isPowerOfTwo(16));
console.log(isPowerOfTwo(3));
console.log(isPowerOfTwo(4));
console.log(isPowerOfTwo(536870913));