/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var result = -1;
var fatherNode = 0;
var isCousins = function(root, x, y) {
    result = -1;
    fatherNode = 0;
    return findNode(root, -1, [x, y], 0);
};

var findNode = function (root, preNodeVal, array, k) {
    if (fatherNode == preNodeVal) {
        return false;
    }
    if (root.val == array[0] || root.val == array[1]) {
        if (result > 0) {
            if (result == k) {
                return true;
            }
        } else {
            result = k;
            fatherNode = preNodeVal;
        }
    }
    if (result > -1 && k >= result) {
        return false;
    } else {
        if (root.left && findNode(root.left, root.val, array, k + 1)) {
            return true;
        }
        if (root.right && findNode(root.right, root.val, array, k + 1)) {
            return true;
        }
    }
    return false;
}

// 执行用时：
// 88 ms
// , 在所有 JavaScript 提交中击败了
// 78.67%
// 的用户
// 内存消耗：
// 39.7 MB
// , 在所有 JavaScript 提交中击败了
// 40.67%
// 的用户