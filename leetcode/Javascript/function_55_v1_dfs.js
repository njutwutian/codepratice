/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let len = nums.length;
    let tempResult = new Array(nums.length).fill(true);
    let dfs = (currentIndex) => {
        if ((currentIndex + nums[currentIndex]) >= len -1) {
            return true;
        }
        if (nums[currentIndex] == 0) {
            tempResult[currentIndex] = false; 
            return false;
        }
        if (!tempResult[currentIndex]) {
            return false;
        }
        for (let i = 1; i <= nums[currentIndex]; i++) {
            if(dfs(currentIndex + i)){
                return true;
            } else {
                tempResult[currentIndex + i] = false;
            }
        }
        return false;
    }
    return dfs(0);
};

console.log(canJump([0]));
console.log(canJump([3,2,1,0,4]));
console.log(canJump([2,3,1,1,4]));