/*
Error:
    http code
    error code
    message
*/

const user_errors = require('../errors/user.errors');
const game_errors = require('../errors/game.errors');

const errors = {
    users: user_errors,
    games: game_errors
}

class CustomError extends Error {
    constructor(message, error_code, http_code){
        super(message);
        this.name = this.constructor.name;
        this.error_code = error_code;
        this.http_code = http_code;
        this.description = message;
    }
}

function getError(entity, code){
    let error = errors[entity][code];
    error.message = entity + ": " + error.function + " - " + error.error;
    let minesweeperError = new CustomError(error.message, error.error_code, error.http_code)

    return minesweeperError;
}

function errorResponse(res, entity, error, fallbackError){
    if(!(error instanceof CustomError)){
        error = getError(entity, fallbackError);
    }
    if(!res.headersSent){
        res.status(error.http_code).json(error);
    }
}

function errorPropagation(entity, error, fallbackError){
    if(!error instanceof CustomError){
        throw getError(entity, fallbackError);
    }   
    else{
        throw error
    }
}

module.exports = {
    getError,
    errorResponse,
    errorPropagation
};