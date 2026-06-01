/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    let compare = (a,b)=>{return a[0]-b[0]};
    intervals.sort(compare);
    let result = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let ele = intervals[i];
        let pre = result[result.length - 1];
        if (ele[0] <= pre[1]) {
            if (ele[1] <= pre[1]) {
                pre = [pre[0],pre[1]];
            } else {
                pre = [pre[0],ele[1]];
            }
            result.pop();
            result.push(pre);
        } else {
            pre = [ele[0], ele[1]];
            result.push(pre);
        }
    }

    return result;
};

console.log(merge([[1,4],[2,3]]));