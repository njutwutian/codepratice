/**
 * @param {string} path
 * @return {string}
 */
 var simplifyPath = function(path) {
    let stack = [];
    stack.push("/");
    let tempStr;
    for (let i = 1; i < path.length; i++) {
        let temp = path[i];
        if (temp == '/') {

        } else if (temp == '.') {
            if (tempStr == '.') {
                
            }
        } else {
            tempStr += temp;
        }
    }
};