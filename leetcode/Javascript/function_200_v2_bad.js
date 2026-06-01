/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
    let array = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            array.push({i,j});
        }
    }
    let count = 1;
    let dfs = (x, y, z) => {
        if (x > m - 1 || y > n - 1 || x < 0 || y < 0) {
            return;
        }
        let ele = grid[x][y];
        if (ele > 1 || ele == 0) {
            let tempIndex = array.findIndex(e => e.i == x && e.j ==y);
            if (tempIndex > 0) {
                array.splice(tempIndex,1);
            }
            
            return;
        }
        if (ele == 1) {
            let tempIndex = array.findIndex(e => e.i == x && e.j ==y);
            if (tempIndex > 0) {
                array.splice(tempIndex,1);
            }
            grid[x][y] = z;
            if (z > count) {
                count = z;
            }
        }
        dfs(x, y - 1, z);
        dfs(x, y + 1, z);
        dfs(x - 1, y, z);
        dfs(x + 1, y, z);
    }
    while (array.length > 0) {
        let ele = array.shift();
        dfs(ele.i, ele.j, count + 1);
    }
    return count - 1;
};
var start = new Date().getTime()
console.log(numIslands([
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]));
var end = new Date().getTime()
console.log('cost is', `${end - start}ms`)