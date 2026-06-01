/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    let m = grid.length;
    let n = grid[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let left = null;
            let top = null;
            if (i != 0) {
                top = grid[i - 1][j];
            }
            if (j != 0) {
                left = grid[i][j - 1];
            }
            if (left == null && top !=null) {
                grid[i][j] = grid[i][j] + top;
            } else if (left != null && top == null) {
                grid[i][j] = grid[i][j] + left;
            } else if (left == null && top == null) {
                grid[i][j] = grid[i][j];
            } else {
                grid[i][j] = grid[i][j] + Math.min(left, top);
            }
        }
    }
    return grid[m-1][n-1];
};
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));