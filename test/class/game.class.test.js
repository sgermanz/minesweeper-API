var gameExpectations = require('../expectations/game.expectations');
var Game = require('../../classes/game.class')

describe('game Class test', () => {
    test('game initialization test', async () => {
        let game = new Game(gameExpectations.gamesToInsert()[1]);

        let expected_cells = game.rows * game.columns;
        let expected_mines = game.mines;
        let cells = 0;
        let mines = 0;

        for(var i = 0; i < game.rows; i++){
            for(var j = 0; j < game.columns; j++){
                cells++;
                if(game.field[i][j].mined){
                    mines++
                }
            }
        }
        expect(expected_cells).toEqual(cells);
        expect(expected_mines).toEqual(mines);
    });
});