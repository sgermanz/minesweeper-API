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

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  GAME_NOT_FOUND,
  GAME_DELETED_SUCCESSFULLY,
  MODULE_NAME
}