/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    let row = new Array(9).fill("");
    let column = new Array(9).fill("");
    let entity;
    let entityIndex;
    for (let i = 0; i < 9; i++) {
        if (i == 0 ||
            i == 3 ||
            i == 6) {
            entity = new Array(3).fill("");
        }
        for (let j = 0; j < 9; j++) {
            switch (j) {
                case 0:
                case 1:
                case 2:
                    entityIndex = 0;
                    break;
                case 3:
                case 4:
                case 5:
                    entityIndex = 1;
                    break;
                case 6:
                case 7:
                case 8:
                    entityIndex = 2;
                    break;
                default:
                    entityIndex = 0;
            }
            const element = board[i][j] != "." ? board[i][j] : "";
            if (element) {
                if (row[i].indexOf(element) > -1 ||
                column[j].indexOf(element) > -1 ||
                entity[entityIndex].indexOf(element) > -1) {
                    return false;
                } else {
                    row[i] += element;
                    column[j] += element;
                    entity[entityIndex] += element;
                }
            }
        }
    }
    return true;
};

console.log(i,j,entityIndex);
console.log("===========",row[i],"===========",column[j],"===========",entity[entityIndex],"===========",element);
console.log(row[i].indexOf(element));
console.log(column[j].indexOf(element));
console.log(entity[entityIndex].indexOf(element));
console.log("===========");

console.log(isValidSudoku([["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]));