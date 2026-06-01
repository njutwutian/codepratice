/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthLargestValue = function (matrix, k) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let currentRowResult = new Array(matrix[0].length);
        for (let j = 0; j < matrix[0].length; j++) {
            if (i == 0) {
                if (j == 0) {
                    currentRowResult[j] = matrix[i][j];
                    matrix[i][j] = matrix[i][j];
                } else {
                    currentRowResult[j] = matrix[i][j] ^ currentRowResult[j - 1];
                    matrix[i][j] = currentRowResult[j];
                }
            } else {
                if (j == 0) {
                    currentRowResult[j] = matrix[i][j];
                    matrix[i][j] = matrix[i][j] ^ matrix[i - 1][j];
                } else {
                    currentRowResult[j] = matrix[i][j] ^ currentRowResult[j - 1];
                    matrix[i][j] = currentRowResult[j] ^ matrix[i - 1][j];
                }
            }
            result.push(matrix[i][j]);
        }
    }
    result.sort((a, b) => b - a);
    return result[k - 1]
};

console.log(kthLargestValue([[5,2],[1,6]], 1));
// console.log(5^2);
// console.log(5^1);
// console.log(5^1^2^6);
