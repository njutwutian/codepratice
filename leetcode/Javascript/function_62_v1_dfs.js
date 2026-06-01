/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let tempResult = new Array(m).fill(-1).map(()=>{
        return new Array(n).fill(-1);
    });
    let dfs = (x,y) => {
        if (x == m-1, y == n-1) {
            return 1;
        }
        if (tempResult[x][y] > -1) {
            return tempResult[x][y];
        }
        let sum = 0;
        if (x < m -1) {
            sum += dfs(x+1,y);
        }
        if (y < n - 1) {
            sum += dfs(x,y+1);
        }
        tempResult[x][y] = sum;
        return sum;
    }
    return dfs(0,0);
};
console.log(uniquePaths(51,9));