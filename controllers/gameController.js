'use strict';

var _ = require('lodash');

var gameService = require('../services/game.service');
var errorHelper = require('../helpers/error.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Game Controller]';

// Error Messages
const GAME_NOT_FOUND = 'Game not found';
const INVALID_PARAMETERS = 'Invalid Parameters';

// Success Messages
const GAME_DELETED_SUCCESSFULLY = 'Game deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

async function getGames(req, res) {
    // Call to service
  try{
    let params = {
      user: req.user._id
    }
    var result = await gameService.getGames(params);
    
    // Returning the result
    res.json(result);
  } catch (error) {
      errorHelper.errorResponse(res, "games", error, 300);
  }
}

async function getGameById(req, res) {
  try {
    // Receiving parameters
    var params = {
      id: req.params.id
    };

    // Call to service
    var result = await gameService.getGameById(params.id);

    // Returning the result
    if (!_.isUndefined(result)) {
      res.json(result);
    } else {
      throw errorHelper.getError(307);
    }
  } catch (error) {
    errorHelper.errorResponse(res, "games", error, 301);
  }
}

async function createGame(req, res) {

  try {
    // Receiving parameters
    var params = req.body;
    params.user = req.user._id;
    var mandatory = ["rows", "columns", "mines"];
    for(var i = 0; i < mandatory.length; i++){
        if(params[mandatory[i]] == undefined) {
          throw errorHelper.getError(308)
        }
    }

    let columns = params.columns;
    let rows = params.rows;
    let mines = params.mines;
    if(mines > columns * rows){
      throw errorHelper.getError(309)
    }

    // Call to service
    var result = await gameService.createGame(params);

    res.status(201).json(result);

  } catch (error) {
    errorHelper.errorResponse(res, "games", error, 302);
  }
}

async function deleteGame(req, res) {

  try {
    // Receiving parameters
    var params = {
      id: req.params.id
    };

    // Call to service
    var result = await gameService.removeGame(params.id);
    res.json(result);

  } catch (error) {
    errorHelper.errorResponse(res, "games", error, 303);
  }
}

async function flagCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y) || _.isUndefined(req.body.time)){
        throw errorHelper.getError("games", 310)
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
        params.time = req.body.time;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        throw errorHelper.getError("games", 311)
      }

      if(!game.validCoordinates(params.x, params.y)){
        throw errorHelper.getError("games", 312)
      }

      game.flagCell(params.x, params.y);
      game.time = params.time;
      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      errorHelper.errorResponse(res, "games", error, 304);
    }
}

async function questionCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y) || _.isUndefined(req.body.time)){
        throw errorHelper.getError("games", 313)
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
        params.time = req.body.time;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        throw errorHelper.getError("games", 314)
      }

      if(!game.validCoordinates(params.x, params.y)){
        throw errorHelper.getError("games", 315)
      }

        game.time = params.time;game.questionCell(params.x, params.y);
      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      errorHelper.errorResponse(res, "games", error, 305);
    }
}

async function revealCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y) || _.isUndefined(req.body.time)){
        throw errorHelper.getError("games", 316)
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
        params.time = req.body.time;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        throw errorHelper.getError("games", 317)
      }

      if(!game.validCoordinates(params.x, params.y)){
        throw errorHelper.getError("games", 318)
      }

      game.reveal(params.x, params.y);
      game.time = params.time;
      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      errorHelper.errorResponse(res, "games", error, 306);
    }
}

module.exports = {
  getGames,
  getGameById,
  createGame,
  deleteGame,
  GAME_NOT_FOUND,
  GAME_DELETED_SUCCESSFULLY,
  INVALID_PARAMETERS,
  MODULE_NAME,
  flagCell,
  questionCell,
  revealCell
}