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
        if (weath == "winter") {
            this.energy -= 2;
            this.multiply -= 2;
        }
        if (weath == "spring") {
            this.energy += 5;
            this.multiply += 5;
        }
        if (weath == "summer") {
            this.energy += 3;
            this.multiply += 3;
        }
        if (weath == "autumn") {
            this.energy--;
            this.multiply--;
        }
    }
}