
// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    let x_result = findNode(root, x, 0);
    let x_k = x_result.count;
    let x_father = x_result.father;
    let y_result = findNode(root, y, 0);
    let y_k = x_result.count;
    let y_father = x_result.father;
    return x_k == y_k && x_father.val != y_father.val;
};

var findNode = function (root, preNode, x, k) {
    if (root.val == x) {
        return {
            count: k,
            father: preNode,
        };
    }
    if (root.left) {
        return findNode(root.left, root, x, k + 1);
    }
    if (root.right) {
        return findNode(root.right, root, x, k + 1);
    }
    return {
        count: -1,
        father: null,
    };
}