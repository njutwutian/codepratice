/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let len = height.length;
    let left = 0;
    let right = len - 1;
    let result = 0;

    while (left < right) {
        let temp = (right-left) * Math.min(height[left],height[right]);
        result = Math.max(result, temp);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return result;
};

console.log(maxArea([4,3,2,1,4]));