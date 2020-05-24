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

    test('game endGame test', async () => {
        let game = new Game(gameExpectations.gamesToInsert()[1]);

        game.endGame();
        let expected_revealed = game.rows * game.columns;
        let revealed = 0;

        for(var i = 0; i < game.rows; i++){
            for(var j = 0; j < game.columns; j++){
                if(game.field[i][j].revealed){
                    revealed++
                }
            }
        }
        expect(expected_revealed).toEqual(revealed);
    });

    test('game updateGameStatus not finished test', async () => {
        let game = new Game(gameExpectations.gamesToInsert()[1]);

        game.field[0][0].revealed = true;
        game.updateGameStatus();

        expect(game.revealed).toEqual(1);
        expect(game.finished).toEqual(false);
    });

    test('game updateGameStatus finished test', async () => {
        let game = new Game(gameExpectations.gamesToInsert()[0]);

        game.field[0][0].revealed = true;
        game.updateGameStatus();

        expect(game.revealed).toEqual(1);
        expect(game.finished).toEqual(true);
    });

    test('game updateGameStatus finished test', async () => {
        let game = new Game(gameExpectations.gamesToInsert()[0]);

        game.field[0][0].revealed = true;
        game.updateGameStatus();

        expect(game.revealed).toEqual(1);
        expect(game.finished).toEqual(true);
    });

    test('game getAdjacent test', async () => {
        let gameData = {
            rows: 3,
            columns: 3,
            mines: 0
        }
        let game = new Game(gameData);
        game.field[0][2].mined = true;

        let adjacent = game.getAdjacent(1,1);

        expect(adjacent.cells.length).toEqual(7);
        expect(adjacent.mines).toEqual(1);
    });

    test('game revealAdjacent test', async () => {
        let gameData = {
            rows: 3,
            columns: 3,
            mines: 0
        }
        let game = new Game(gameData);
        game.field[0][2].mined = true;
        game.finished = false;
        game.revealAdjacent(1,1);
        game.updateGameStatus();

        expect(game.finished).toEqual(false);
        expect(game.revealed).toEqual(8);
    });

    test('game revealAdjacent recursive test', async () => {
        let gameData = {
            rows: 3,
            columns: 3,
            mines: 0
        }
        let game = new Game(gameData);
        game.field[0][2].mined = true;
        game.finished = false;
        game.revealAdjacent(0,0);
        game.updateGameStatus();

        expect(game.finished).toEqual(false);
        expect(game.revealed).toEqual(8);
    });

    test('game reveal not mined test', async () => {
        let gameData = {
            rows: 3,
            columns: 3,
            mines: 0
        }
        let game = new Game(gameData);
        game.field[0][2].mined = true;
        game.finished = false;
        game.reveal(0,0);

        expect(game.finished).toEqual(false);
        expect(game.revealed).toEqual(8);
    });

    test('game reveal not mined test', async () => {
        let gameData = {
            rows: 3,
            columns: 3,
            mines: 0
        }
        let game = new Game(gameData);
        game.field[0][2].mined = true;
        game.finished = false;
        game.reveal(0,2);

        expect(game.finished).toEqual(true);
        expect(game.revealed).toEqual(9);
    });
});


// reveal
// +getAdjacent
// revealAdjacent
// +endGame
// +updateGameStatus