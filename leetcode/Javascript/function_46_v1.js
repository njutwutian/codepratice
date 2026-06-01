/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let len = nums.length;
    let result = [];
    let dfs = (current, left)=>{
        if (current.length == len) {
            result.push(current);
        }

        for (let i = 0; i < left.length; i++) {
            if (left[i] > -11) {
                let tempLeft = [...left];
                tempLeft[i] = -11
                dfs(current.concat(left[i]), tempLeft);
            }
        }
    }
    dfs([], nums);
    return result;
};

console.log(permute([1,2]));
console.log(permute([1]));