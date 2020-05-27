/*
Error:
    http code
    error code
    message
*/
const errors = {
    //Controller Errors
    300: {error_code: 300, http_code: "500", message: "getGames Unexpected Error"},
    301: {error_code: 301, http_code: "500", message: "getGameById Unexpected Error"},
    302: {error_code: 302, http_code: "500", message: "createGame Unexpected Error"},
    303: {error_code: 303, http_code: "400", message: "createGame Missing Params"},
    304: {error_code: 304, http_code: "400", message: "createGmes More mines than cells"},
    305: {error_code: 305, http_code: "500", message: "flagCell Unexpected Error"},
    306: {error_code: 306, http_code: "400", message: "flagCell Missing Parameters"},
    307: {error_code: 307, http_code: "400", message: "flagCell Game Not Found"},
    308: {error_code: 308, http_code: "400", message: "flagCell Invalid Coordinates"},
    309: {error_code: 309, http_code: "500", message: "questionCell Unexpected Error"},
    310: {error_code: 310, http_code: "400", message: "questionCell Missing Parameters"},
    311: {error_code: 311, http_code: "400", message: "questionCell Game Not Found"},
    312: {error_code: 312, http_code: "400", message: "questionCell Invalid Coordinates"},
    313: {error_code: 313, http_code: "500", message: "revealCell Unexpected Error"},
    314: {error_code: 314, http_code: "400", message: "revealCell Missing Parameters"},
    315: {error_code: 315, http_code: "400", message: "revealCell Game Not Found"},
    316: {error_code: 316, http_code: "400", message: "revealCell Invalid Coordinates"},
    317: {error_code: 317, http_code: "500", message: "deleteGame Unexpected Error"},
    318: {error_code: 318, http_code: "500", message: "User registration unexpected error"},
    319: {error_code: 319, http_code: "400", message: "User Already exists"},
    320: {error_code: 320, http_code: "500", message: "User Login unexpected Error"},
    321: {error_code: 321, http_code: "400", message: "Invalid Login Information"},

    //Service Errors
    200: {error_code: 200, http_code: "500", message: "getGames Unexpected Error"},
    201: {error_code: 201, http_code: "500", message: "getGameById Unexpected Error"},
    202: {error_code: 202, http_code: "500", message: "createGame Unexpected Error"},
    203: {error_code: 203, http_code: "500", message: "updateGame Unexpected Error"},
    204: {error_code: 204, http_code: "500", message: "removeGame Unexpected Error"},
    205: {error_code: 205, http_code: "500", message: "getUserByUsername Unexpected Error"},
    206: {error_code: 206, http_code: "500", message: "createUser Unexpected Error"},

    //Repository Errors
    100: {error_code: 100, http_code: "500", message: "getGames Unexpected Error"},
    101: {error_code: 101, http_code: "500", message: "getGameById Unexpected Error"},
    102: {error_code: 102, http_code: "500", message: "createGame Unexpected Error"},
    103: {error_code: 103, http_code: "500", message: "updateGame Unexpected Error"},
    104: {error_code: 104, http_code: "500", message: "remove Game Unexpected Error"},
    105: {error_code: 105, http_code: "500", message: "getUserByUsername Unexpected Error"},
    106: {error_code: 106, http_code: "500", message: "createUser Unexpected Error"}
}

class MinesweeperError extends Error {
    constructor(message, error_code, http_code){
        super(message);
        this.name = this.constructor.name;
        this.error_code = error_code;
        this.http_code = http_code;
        this.description = message;
    }
}

function getError(code){
    let error = errors[code];
    let minesweeperError = new MinesweeperError(error.message, error.error_code, error.http_code)

    return minesweeperError;
}

function errorResponse(res, error, fallbackError){
    if(!error instanceof MinesweeperError){
        console.log(error);
        error = getError(fallbackError);
    }

    res.status(error.http_code).json(error);
}

function errorPropagation(error, fallbackError){
    if(!error instanceof MinesweeperError){
        console.log(error);
        throw getError(fallbackError);
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