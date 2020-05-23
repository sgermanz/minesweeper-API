'use strict';

var _ = require('lodash');

class Game {
    constructor (game) {
        let properties = [
            "_id",
            "rows", 
            "columns", 
            "mines",
            "field"
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
}

module.exports = Game