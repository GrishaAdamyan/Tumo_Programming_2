module.exports = class AddCharacters {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add() {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 0) {
                    var a = Math.floor(Math.random() * 100)
                    if (a >= 0 && a < 60) {
                        matrix[i][j] = 0
                    }
                    else if (a >= 60 && a < 70) {
                        matrix[i][j] = 1
                    }
                    else if (a >= 70 && a < 80) {
                        matrix[i][j] = 2
                    }
                    else if (a >= 80 && a < 90) {
                        matrix[i][j] = 3
                    }
                    else if (a >= 90 && a < 100) {
                        matrix[i][j] = 4
                    }
                }
            }
        }
    }
}