/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function(candiesCount, queries) {
    let len = queries.length;
    let result = new Array(len).fill(true);
    for (let index = 0; index < len; index++) {
        let element = queries[index];
        let favouriteType = element[0];
        let favouriteDay = element[1];
        let cap = element[2];
        let min = 0;
        for (let i = 0; i < favouriteType; i++) {
            min +=candiesCount[i];
        }
        let max = min + candiesCount[favouriteType];
        if (max <= favouriteDay || min > (favouriteDay) * cap) {
            result[index] = false;
        }
    }
    return result;
};
