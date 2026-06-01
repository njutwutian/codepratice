/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let result = [];
    let search = (pre) => {
        if (pre.length > 0) {
            let currentArray = [];
            let preArray = [];
            pre.map(e=>{
                if (e != null) {
                    currentArray.push(e.val);
                    preArray.push(e.left, e.right);
                }
            });
            if (currentArray.length > 0) {
                result.push(currentArray);
            }
            search(preArray);
        }
    }
    search([root]);
    return result;
};
let r = new TreeNode(3, new TreeNode(9,null,null),new TreeNode(20, new TreeNode(15,null,null), new TreeNode(7,null,null)));
console.log(levelOrder(r));