'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
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
      errorHelper.errorResponse(res, error, 300);
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
      res.status(404).json(messageHelper.buildMessage(GAME_NOT_FOUND))
    }
  } catch (error) {
    errorHelper.errorResponse(res, error, 301);
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
          throw errorHelper.getError(303)
        }
    }

    let columns = params.columns;
    let rows = params.rows;
    let mines = params.mines;
    if(mines > columns * rows){
      throw errorHelper.getError(304)
    }

    // Call to service
    var result = await gameService.createGame(params);

    res.status(201).json(result);

  } catch (error) {
    errorHelper.errorResponse(res, error, 302);
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
    result.message = messageHelper.buildMessage(GAME_DELETED_SUCCESSFULLY).message;
    res.json(result);

  } catch (error) {
    errorHelper.errorResponse(res, error, 317);
  }
}

async function flagCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y)){
        throw errorHelper.getError(306)
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        throw errorHelper.getError(307)
      }

      if(!game.validCoordinates(params.x, params.y)){
        throw errorHelper.getError(308)
      }

      game.flagCell(params.x, params.y);

      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      errorHelper.errorResponse(res, error, 305);
    }
}

async function questionCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y)){
        throw errorHelper.getError(310)
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        throw errorHelper.getError(311)
      }

      if(!game.validCoordinates(params.x, params.y)){
        throw errorHelper.getError(312)
      }

      game.questionCell(params.x, params.y);

      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      errorHelper.errorResponse(res, error, 309);
    }
}

async function revealCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y)){
        throw errorHelper.getError(314)
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        throw errorHelper.getError(315)
      }

      if(!game.validCoordinates(params.x, params.y)){
        throw errorHelper.getError(316)
      }

      game.reveal(params.x, params.y);

      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      errorHelper.errorResponse(res, error, 313);
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