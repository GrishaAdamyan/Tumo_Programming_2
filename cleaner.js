class Cleaner {
    clean() {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = 0
            }
        }
    }
}