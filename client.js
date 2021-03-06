var socket = io()
var weath = 'winter'
var side = 20
function setup() {
    //frameRate(3);
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}

socket.on("weather", function (data) {
    weath = data;
})

function drawing(matrix) {
    console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
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

socket.on('send matrix', drawing)

function cleaner() {
    socket.emit("cleaner")
}
function addCharacters() {
    socket.emit("addCharacters")
}