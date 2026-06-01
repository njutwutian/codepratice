/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    let result = new Array(10000).fill(0);
    for (let i = 0; i < intervals.length; i++) {
        for (let j = intervals[i][0]; j <= intervals[i][1]; j++) {
            if (result[j] == 0) {
                result[j] = 1;
            }
        }     
    }
    let response = [];
    let flag = true;
    let temp = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i] == 1 && flag) {
            temp.push(i);
            flag = false;
        }
        if (result[i] == 0 && !flag) {
            flag = true;
            temp.push(i-1);
            response.push(temp);
            temp = [];
        }
    }
    if (!flag) {
        temp.push(9999);
        response.push(temp);
    }
    return response;
};

console.log(merge([[1,4],[5,6]]));