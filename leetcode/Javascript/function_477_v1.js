var totalHammingDistance = function (nums) {
    let map = new Array((10**9).toString(2).length).fill(0);
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        console.log(nums[i].toString(2));
        let index = 0;
        while(nums[i] > 0) {
            map[index] += nums[i]&1;
            nums[i] >>= 1;
            index++;
        }
    }
    console.log(map);
    let len = nums.length;
    for (let i = 0; i < map.length; i++) {
        const element = map[i];
        result += (len - element) * element;
    }
    return result;
};

var totalHammingDistance2 = function (nums) {
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

console.log(totalHammingDistance([4,12,2]));