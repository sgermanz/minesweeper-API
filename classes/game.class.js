'use strict';

var _ = require('lodash');

class Game {
    constructor (game) {
        let properties = [
            "_id",
            "rows", 
            "columns", 
            "mines",
            "field",
            "revealed",
            "finished",
            "user",
            "time"
        ]
        for(var i = 0; i < properties.length; i++){
            let property = properties[i];
            if(game[property] != undefined){
                this[property] = game[property];
            }
        }
        
        if(!this.present("field")){
            let field_rows = new Array(this.rows);
            for(var i = 0; i < field_rows.length; i++){
                let field_columns = new Array(this.columns);
                for(var j = 0; j < field_columns.length; j++){
                    let cell = {
                        flagged: false,
                        mined: false,
                        question: false,
                        revealed: false
                    }
                    field_columns[j] = cell;
                }
                field_rows[i] = field_columns;
            }
            this.field = field_rows;

            this.initializeMines();
        }
    }

    initializeMines(){
        function getRandom(range, n) {            
            let result = new Array(n);
            while (n - 1 >= 0) {
                let x = Math.floor(Math.random() * range);
                if(!result.includes(x)){
                    result[n-1] = x;
                    n--;
                }
            }
            return result;
        }

        let mined = getRandom(this.rows * this.columns, this.mines)
        let count = 0;
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                if(mined.includes(count)){
                    this.field[i][j].mined = true;
                }
                count++;
            }
        }
    }

    compare(game){
        let equal = true;
        if(this.present("_id")){
            equal = equal && _.isEqual(this._id, game._id);
        }
        equal = equal && _.isEqual(this.rows, game.rows);
        equal = equal && _.isEqual(this.columns, game.columns);
        equal = equal && _.isEqual(this.mines, game.mines);

        if(!equal) return equal;

        if(this.present("field")){
            for(var i = 0; i < this.rows; i++){
                for(var j = 0; j < this.columns; j++){
                    equal = equal && _.isEqual(this.field[i][j].flagged, game.field[i][j].flagged);
                    equal = equal && _.isEqual(this.field[i][j].mined, game.field[i][j].mined);
                    equal = equal && _.isEqual(this.field[i][j].question, game.field[i][j].question);
                    equal = equal && _.isEqual(this.field[i][j].revealed, game.field[i][j].revealed);                
                }
            }
        }

        return equal;
    }

    present(property){
        return this[property] != undefined;
    }

    updateCell(x, y, data){
        this.field[x][y] = data;
    }

    reveal(x, y){
        let current_cell = this.field[x][y];

        if(current_cell.mined){
            this.endGame()
        }
        else{
            let adjacent = this.getAdjacent(x, y);
            current_cell.adjacent_mines = adjacent.mines;

            for(var i = 0; i < adjacent.cells.length; i++){
                this.revealAdjacent(adjacent.cells[i][0], adjacent.cells[i][1])
            }
        }

        current_cell.revealed = true;
        this.updateCell(x, y, current_cell);
        this.updateGameStatus();
    }

    validCoordinates(x, y){
        return x >= 0 &&
               x < this.rows &&
               y >= 0 &&
               y < this.columns
    }

    getAdjacent(x, y){
        //returns unrevealed and unmined adjacent mines
        let adjacent_values = [
            [x, y - 1],
            [x, y + 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y - 1],
            [x - 1, y + 1],
            [x + 1, y - 1],
            [x + 1, y + 1] 
        ]

        let adjacent_cells = [];
        let adjacent_mines = 0;

        for(var i = 0; i < adjacent_values.length; i++){
            let current = adjacent_values[i];
            if(this.validCoordinates(current[0], current[1])){
                let cell = this.field[current[0]][current[1]]
                if(!cell.revealed && !cell.mined){
                    adjacent_cells.push(current);
                }
                if(cell.mined){
                    adjacent_mines++;
                }
            }
        }
        return {
            cells: adjacent_cells, 
            mines: adjacent_mines
        }
    }

    revealAdjacent(x, y){
        let current = this.field[x][y];

        let adjacent = this.getAdjacent(x, y);

        current.revealed = true;
        current.adjacent_mines = adjacent.mines;
        this.updateCell(x, y, current);

        for(var i = 0; i < adjacent.cells.length; i++){
            this.revealAdjacent(adjacent.cells[i][0], adjacent.cells[i][1])
        }
    }

    endGame(){
        this.finished = true;
        //finish and reveal all
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                this.field[i][j].revealed = true;
            }
        }
    }

    updateGameStatus(){
        let revealed_count = 0;
        //updates revealed amount and validates game status
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                if(this.field[i][j].revealed){
                    revealed_count++;
                }
            }
        }
        this.revealed = revealed_count;
        if(this.revealed == this.rows * this.columns){
            this.finished = true;
        }
    }

    flagCell(x,y){
        this.field[x][y].flagged = true;
    }

    questionCell(x,y){
        this.field[x][y].question = true;
    }
}

module.exports = Game