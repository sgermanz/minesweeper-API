// var gameSchema = Schema({
//     rows: Number,
//     columns: Number,
//     mines: Number,
//     field: [[{
//         flagged: Boolean,
//         mined: Boolean,
//         question: Boolean,
//         revealed: Boolean
//     }]]
// });

let Game = require('../../classes/game.class');

function getGameByID(){
    return new Game({
        "_id": "5e54545e4dc3ab191dde34d2",
        "rows": 1,
        "columns": 1,
        "mines": 0,
        "field": [[{
            flagged: false,
            mined: false,
            question: false,
            revealed: false
        }]]
    })
}

function getGames(){
    return [
        new Game({
            "_id": "5e54545e4dc3ab191dde34d2",
            "rows": 1,
            "columns": 1,
            "mines": 0,
            "field": [[{
                flagged: false,
                mined: false,
                question: false,
                revealed: false
            }]]
        }),
        new Game({
            "_id": "5e54545e4dc3ab191dde34d3",
            "rows": 2,
            "columns": 2,
            "mines": 1,
            "field": [
                        [
                            {
                                flagged: false,
                                mined: false,
                                question: false,
                                revealed: false
                            },
                            {
                                flagged: false,
                                mined: false,
                                question: false,
                                revealed: false
                            }
                        ],
                        [
                            {
                                flagged: false,
                                mined: true,
                                question: false,
                                revealed: false
                            },
                            {
                                flagged: false,
                                mined: false,
                                question: false,
                                revealed: false
                            }
                        ]      
                    ]
        }),
    ]
}

function gameToInsert(){
    return  new Game({
        "rows": 1,
        "columns": 1,
        "mines": 0,
        "field": [[{
            flagged: false,
            mined: false,
            question: false,
            revealed: false
        }]]
    })
}

function gamesToInsert(){
    return [
        new Game({
            "rows": 1,
            "columns": 1,
            "mines": 0,
            "field": [[{
                flagged: false,
                mined: false,
                question: false,
                revealed: false
            }]]
        }),
        new Game({
            "rows": 2,
            "columns": 2,
            "mines": 1,
            "field": [
                        [
                            {
                                flagged: false,
                                mined: false,
                                question: false,
                                revealed: false
                            },
                            {
                                flagged: false,
                                mined: false,
                                question: false,
                                revealed: false
                            }
                        ],
                        [
                            {
                                flagged: false,
                                mined: true,
                                question: false,
                                revealed: false
                            },
                            {
                                flagged: false,
                                mined: false,
                                question: false,
                                revealed: false
                            }
                        ]      
                    ]
        })
    ]
}

function getGameByIDError(){
    return "getGameByIDError";
}

function getGamesError(){
    return "getGamesError";
}

function deleteGameError(){
    return "deleteGameError";
}

function createGameError(){
    return "createGameError";
}

function updateGameError(){
    return "updateGameError";
}

module.exports = {
    getGameByID,
    getGames,
    gameToInsert,
    gamesToInsert,
    getGameByIDError,
    getGamesError,
    deleteGameError,
    createGameError,
    updateGameError,
}