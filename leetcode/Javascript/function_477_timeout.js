var totalHammingDistance = function (nums) {
    let map = new Array(10**9);
    let result = 0;
    for (let i = 0; i < nums.length-1; i++) {
        for (let j = i+1; j < nums.length; j++) {
            let element = nums[i] ^ nums[j];
            let tempResult = 0;
            if (map[element]) {
                tempResult = map[element];
            } else {
                tempResult = hammingDistance(element);
                map[element] = tempResult;
            }
            result += tempResult
        }
    }
    return result;
};

var hammingDistance = function (result) {
    let count = 0;
    while (result > 0) {
        count += result & 1;
        result >>= 1;
    }
    return count;
};