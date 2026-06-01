/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
    let result = [];
    let map = new Map();
    for (let i = 0; i < words.length; i++) {
        const element = words[i];
        if (map.has(element)) {
            map.set(element, map.get(element) + 1);
        } else {
            map.set(element, 1);
        }
    }
    map.forEach((value, key) => {
        result.push({key, value});
    });
    result.sort((a,b) => {
        if (a.value > b.value) {
            return -1;
        }
        if (a.value < b.value) {
            return 1;
        }
        if (a.key < b.key) {
            return -1;
        }
        return 0;
    });
    result = result.slice(0,k).map(obj=>{
        return obj.key;
    });
    return result;
};

topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 2);
console.log("il" > "i");
console.log("i".charCodeAt(0) > "l".charCodeAt(0));

// 执行用时：
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 97.10%
// 的用户
// 内存消耗：
// 40.4 MB
// , 在所有 JavaScript 提交中击败了
// 78.26%
// 的用户