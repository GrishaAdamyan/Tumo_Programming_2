let main = require('./main')

module.exports = class Grass extends main {
    constructor(x, y, index, multiply) {
        super(x, y, index, multiply);
    }
    
    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        console.log(emptyCells);
        if (newCell && this.multiply >= 5) {
            matrix[newCell[0]][newCell[1]] = 1;

            var newGrass = new Grass(newCell[0], newCell[1]);
            GrassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}