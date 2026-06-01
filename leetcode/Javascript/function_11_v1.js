/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let sumMax = 0;
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            let tempHeight = height[i] > height[j] ? height[j] : height[i];
            let temp = tempHeight * (j - i);
            if (temp > sumMax) {
                sumMax = temp
            }
        }
    }
    return sumMax;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));