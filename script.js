var matrix = []
for (var i = 0; i < 30; i++) {
    matrix[i] = []
    for (var j = 0; j < 30; j++) {
        var a = Math.floor(Math.random() * 100)
        if (a >= 0 && a < 60) {
            matrix[i][j] = 1
        }
        else if (a >= 60 && a < 80) {
            matrix[i][j] = 2
        }
        else if (a >= 80 && a < 85) {
            matrix[i][j] = 3
        }
        else if (a >= 85 && a < 90) {
            matrix[i][j] = 4
        }
    }
}

side = 20


var GrassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var HunterArr = [];
// var CharacterArr = [];

function setup() {
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                GrassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 1);
                GrassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 1);
                PredatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var hunt = new Hunter(x, y, 1);
                HunterArr.push(hunt);
            }
        }
    }
}

function draw() {

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

    for (let i in GrassArr) {
        try { GrassArr[i].mul() } catch (err) { continue };
    }

    for (let i in GrassEaterArr) {
        try { GrassEaterArr[i].eat() } catch (err) { continue };
        try { GrassEaterArr[i].mul() } catch (err) { continue };
    }

    for (let i in PredatorArr) {
        try { PredatorArr[i].eat() } catch (err) { continue };
        try { PredatorArr[i].mul() } catch (err) { continue };
    }

    for (let i in HunterArr) {
        try { HunterArr[i].eat() } catch (err) { continue };
    }

    // for (let i in CharacterArr) {
    //     CharacterArr[i].mul()
    //     console.log(CharacterArr[i])
    // }
}