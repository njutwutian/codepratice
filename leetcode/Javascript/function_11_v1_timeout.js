/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let len = height.length;
    let result = 0;
    for (let i = len-2; i >-1; i--) {
        for (let j = i+1; j < len; j++) {
            let temp = (j-i) * Math.min(height[i],height[j]);
            result = Math.max(result, temp);
        } 
    }
    return result;
};

// var maxArea = function(height) {
//     let len = height.length;
//     let result = new Array(len).fill(0);
//     for (let i = len-2; i >-1; i--) {
//         let current = new Array(len).fill(0);
//         for (let j = i+1; j < len; j++) {
//             let temp = (j-i) * Math.min(height[i],height[j]);
//             if (j == i+1) {
//                 current[j] = temp;
//             } else {
//                 current[j] = Math.max(result[j],current[j-1], temp);
//             }
//         } 
//         result = current; 
//     }
//     return result[len-1];
// };

console.log(maxArea([1,1]));