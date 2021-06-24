var socket = io()

side = 30

function setup() {
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}

function drawing() {
    if (count <= 10) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    fill("green");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("black");
                }
                rect(x * side, y * side, side, side);
            }
        }
    }
}

setInterval(
    function () {
        socket.on('send message', drawing)
    }, 1000
)