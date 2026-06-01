/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    let start = [];
    let end = [];
    for (let i = 0; i < intervals.length; i++) {
        let temp = intervals[i];
        start.push(temp[0]);    
        end.push(temp[1]);    
    }
    
    let compare = (a,b)=>{return a-b};
    start.sort(compare);
    end.sort(compare);
    let result = [[start[0],end[0]]];
    for (let i = 1; i < start.length; i++) {
        let pre = result[result.length - 1];
        let tempStart = start[i];
        let tempEnd = end[i];
        if (tempStart <= pre[1]) {
            result.pop();
            pre = [pre[0],tempEnd];
            result.push(pre);
        } else {
            pre = [tempStart, tempEnd];
            result.push(pre);
        }
    }

    return result;
};

console.log(merge([[1,4],[4,5]]));