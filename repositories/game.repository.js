'use strict';
var GameModel = require('../models/game')
var Game = require('../classes/game.class')
var _ = require('lodash');

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

async function createGame(game){
    try{
        var gameObj = new GameModel(game);
        return new Game(await gameObj.save());
    }
    catch(error){
        throw error;
    }
}

async function removeGame(id){
    try{
        return new Game(await GameModel.findByIdAndRemove(id));
    }
    catch(error){
        throw error;
    }
} 

async function removeAllGames(){
    try{
        return await GameModel.remove({});
    }
    catch(error){
        throw error;
    }
} 

async function updateGame(game){
    try{
        var gameObj = await GameModel.findById(game._id);
        gameObj.rows = !_.isUndefined(game.rows) ? game.rows : gameObj.rows;
        gameObj.columns = !_.isUndefined(game.columns) ? game.columns : gameObj.columns;
        gameObj.mines = !_.isUndefined(game.mines) ? game.mines : gameObj.mines;
        gameObj.field = !_.isUndefined(game.field) ? game.field : gameObj.field;
        gameObj.revealed = !_.isUndefined(game.revealed) ? game.revealed : gameObj.revealed;
        gameObj.finished = !_.isUndefined(game.finished) ? game.finished : gameObj.finished;
        
        return new Game(await gameObj.save());
    }
    catch(error){
        throw error;
    }
}

async function getGameById(id){
    try{
        return new Game(await GameModel.findById(id));
    }
    catch(error){
        throw error;
    }
}

async function getGames(){
    try{
        let respository_games = await GameModel.find(); 
        let games = [];
        for(var i = 0; i < respository_games.length; i++){
            games.push(new Game(respository_games[i]))
        }
        return games;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    createGame,
    removeGame,
    removeAllGames,
    updateGame,
    getGameById,
    getGames
}