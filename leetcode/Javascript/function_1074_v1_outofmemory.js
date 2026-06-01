/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
    // length
    let height = matrix.length;
    let width = matrix[0].length;
    // result
    let result = new Array(height).fill(-1001).map( ()=>{
        return new Array(width).fill(-1001).map( ()=>{
            return new Array(height).fill(-1001).map( ()=>{
                return new Array(width).fill(-1001)
            });
        });
    });
    let count = 0;
    var getSum = (x,y,h,w) => {
        if (h == w  && h == 1) {
            result[x][y][x][y] = matrix[x][y];
            return result[x][y][x][y];
        } else {
            if (result[x][y][x+h-1][y+w-2] > -1001) {
                // left
                let a = result[x][y][x+h-1][y+w-2];
                let b = result[x][y+w-1][x+h-1][y+w-1];
                result[x][y][x+h-1][y+w-1] = a + b;
                return result[x][y][x+h-1][y+w-1]
            }
            if (result[x][y][x+h-2][y+w-1] > -1001) {
                // up
                let a = result[x][y][x+h-2][y+w-1];
                let b = result[x+h-1][y][x+h-1][y+w-1];
                result[x][y][x+h-1][y+w-1] = a + b
                return result[x][y][x+h-1][y+w-1]
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

    console.log("result: ",numSubmatrixSumTarget([[1,-1],[-1,1]],0));


