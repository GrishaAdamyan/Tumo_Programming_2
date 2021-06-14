class main {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul(quantity, das, arr, ind, var_for_mul_and_energy, value){
        if (var_for_mul_and_energy == this.multiply);
            var_for_mul_and_energy++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        console.log(emptyCells);
        if (newCell && this.multiply >= quantity) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = ind;

            var newGrass = new das(newX, newY, ind);
            arr.push(newGrass);
            var_for_mul_and_energy = value;
        }
    }

    move(ind, NewElement, das, arr) {
        this.getNewCoordinates()
        this.energy -= ind
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            var NewElement = new das(newX, newY)
            arr.push(NewElement)
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat(arr) {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy += 1
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in arr) {
                if (newX == arr[i].x && newY == arr[i].y) {
                    arr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die(arr) {
        matrix[this.y][this.x] = 0;
        for (var i in arr) {
            if (this.x == arr[i].x && this.y == arr[i].y) {
                arr.splice(i, 1);
                break;
            }
        }
    }
}