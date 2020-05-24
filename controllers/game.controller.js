'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var gameService = require('../services/game.service');

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
    var result = await gameService.getGames();
    
    // Returning the result
    res.json(result);
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getGames.name, error, res);
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
    controllerHelper.handleErrorResponse(MODULE_NAME, getGameById.name, error, res);
  }
}

async function createGame(req, res) {

  try {
    // Receiving parameters
    var params = req.body;
    var mandatory = ["rows", "columns", "mines"];
    for(var i = 0; i < mandatory.length; i++){
        if(params[mandatory[i]] == undefined) {
            throw "Missing Params"
        }
    }

    let columns = params.columns;
    let rows = params.rows;
    let mines = params.mines;
    if(mines > columns * rows){
        throw "More mines than cells"
    }

    // Call to service
    var result = await gameService.createGame(params);

    res.status(201).json(result);

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createGame.name, error, res);
  }
}

async function updateGame(req, res) {

  try {
    // Receiving parameters
    var params = {
      id: req.params.id
    };
    _.assign(params, req.body);

    // Call to service
    var result = await gameService.updateGame(params);
    // Returning the result
    res.json(result);
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateGame.name, error, res);
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
    controllerHelper.handleErrorResponse(MODULE_NAME, deleteGame.name, error, res);
  }
}

async function flagCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y)){
        res.status(404).json(messageHelper.buildMessage(INVALID_PARAMETERS))
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        res.status(404).json(messageHelper.buildMessage(GAME_NOT_FOUND))
      }

      if(!game.validCoordinates(params.x, params.y)){
        res.status(404).json(messageHelper.buildMessage(INVALID_PARAMETERS))
      }

      game.flagCell(params.x, params.y);

      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, getGameById.name, error, res);
    }
}

async function questionCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y)){
        res.status(404).json(messageHelper.buildMessage(INVALID_PARAMETERS))
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        res.status(404).json(messageHelper.buildMessage(GAME_NOT_FOUND))
      }

      if(!game.validCoordinates(params.x, params.y)){
        res.status(404).json(messageHelper.buildMessage(INVALID_PARAMETERS))
      }

      game.questionCell(params.x, params.y);

      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, getGameById.name, error, res);
    }
}

async function revealCell(req, res){
  try{
      // Receiving parameters
      var params = {
        id: req.params.id
      };
  
      if(_.isUndefined(req.body.x) || _.isUndefined(req.body.y)){
        res.status(404).json(messageHelper.buildMessage(INVALID_PARAMETERS))
      }
      else{
        params.x = req.body.x;
        params.y = req.body.y;
      }
      let game = await gameService.getGameById(params.id);

      if (_.isUndefined(game)) {
        res.status(404).json(messageHelper.buildMessage(GAME_NOT_FOUND))
      }

      if(!game.validCoordinates(params.x, params.y)){
        res.status(404).json(messageHelper.buildMessage(INVALID_PARAMETERS))
      }

      game.reveal(params.x, params.y);
      console.log("game", game)

      let response =  await gameService.updateGame(game);      
      res.json(response);

    } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, getGameById.name, error, res);
    }
}

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  GAME_NOT_FOUND,
  GAME_DELETED_SUCCESSFULLY,
  INVALID_PARAMETERS,
  MODULE_NAME,
  flagCell,
  questionCell,
  revealCell
}