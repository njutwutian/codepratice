/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
    let height = matrix.length;
    let width = matrix[0].length;
    let count = 0;
    var getSum = (x,y,h,w) => {
        let tempSum = 0;
        for (let i = x; i < x+h; i++) {
            for (let j = y; j < w + y; j++) {
                tempSum += matrix[i][j];
            }        
        }

        return -1001;
    }
    for (let h = 1; h <= height; h++) {
        for (let w = 1; w <= width; w++) {
            for (let i = 0; i <= height - h; i++) {
                for (let j = 0; j <= width - w; j++) {
                    if (target == getSum(i,j,h,w)) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
};

    console.log("result: ",numSubmatrixSumTarget([[0,1,0],[1,1,1],[0,1,0]],0));


