'use strict';

var GameRepository = require('../repositories/game.repository')
var Game = require('../classes/game.class')
var errorHelper = require('../helpers/error.helper');

////////////////////////////////////////////////////////////////////////////////
// MESSAGES
////////////////////////////////////////////////////////////////////////////////

const CREATE_ERROR = "Error creating Game";
const DELETE_ERROR = "Error deleting Game";
const UPDATE_ERROR = "Error updating Game";
const FIND_ONE_BY_ID_ERROR = "Error finding Game";
const FIND_MANY_ERROR = "Error finding Games";

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

async function createGame(game){
    try{
        return GameRepository.createGame(new Game(game))
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 202)
    }
}

async function removeGame(id){
    try{
        return GameRepository.removeGame(id)
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 204)
    }
} 

async function updateGame(game){
    try{
        return GameRepository.updateGame(game);
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 203)
    }
}

async function getGameById(id){
    try{
        return GameRepository.getGameById(id)
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 201)
    }
}

async function getGames(params){
    try{
        var response = await GameRepository.getGames(params);
        return response;
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 200)
    }
}

module.exports = {
    createGame,
    removeGame,
    updateGame,
    getGames,
    getGameById
}