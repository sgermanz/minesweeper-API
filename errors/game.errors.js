/*
Error:
    http code
    error code
    message
*/

const errors = {

    /*****storage*****/
        100: {error_code: 100, http_code: "500", function: "createGame", error:"Unexpected Errsor"},
        101: {error_code: 101, http_code: "500", function: "removeGame", error:"Unexpected Error"},
        102: {error_code: 102, http_code: "500", function: "removeAllGames", error:"Unexpected Error"},
        103: {error_code: 103, http_code: "500", function: "updateGame", error:"Unexpected Error"},
        104: {error_code: 104, http_code: "500", function: "getGameById", error:"Unexpected Error"},
        105: {error_code: 105, http_code: "500", function: "getGames", error:"Unexpected Error"},
    /*****service*****/
        200: {error_code: 200, http_code: "500", function: "createGame", error:"Unexpected Error"},
        201: {error_code: 201, http_code: "500", function: "removeGame", error:"Unexpected Error"},
        202: {error_code: 202, http_code: "500", function: "updateGame", error:"Unexpected Error"},
        203: {error_code: 203, http_code: "500", function: "getGameById", error:"Unexpected Error"},
        204: {error_code: 204, http_code: "500", function: "getGames", error:"Unexpected Error"},
    /*****controller*****/
        300: {error_code: 300, http_code: "500", function: "getGames", error:"Unexpected Error"},
        301: {error_code: 301, http_code: "500", function: "getGameById", error:"Unexpected Error"},
        302: {error_code: 302, http_code: "500", function: "createGame", error:"Unexpected Error"},
        303: {error_code: 303, http_code: "500", function: "deleteGame", error:"Unexpected Error"},
        304: {error_code: 304, http_code: "500", function: "flagCell", error:"Unexpected Error"},
        305: {error_code: 305, http_code: "500", function: "questionCell", error:"Unexpected Error"},
        306: {error_code: 306, http_code: "500", function: "revealCell", error:"Unexpected Error"},
        307: {error_code: 307, http_code: "400", function: "getGameById", error:"Game not found"},
        308: {error_code: 308, http_code: "400", function: "createGame", error:"Mandatory parameters: rows, columns or mines"},
        309: {error_code: 309, http_code: "400", function: "createGame", error:"Mines should be lesser than grid capacity"},
        310: {error_code: 310, http_code: "400", function: "flagCell", error:"Undefined cell coordinates"},
        311: {error_code: 311, http_code: "400", function: "flagCell", error:"Game not found"},
        312: {error_code: 312, http_code: "400", function: "flagCell", error:"Invalid cell coordinates"},
        313: {error_code: 313, http_code: "400", function: "questionCell", error:"Undefined cell coordinates"},
        314: {error_code: 314, http_code: "400", function: "questionCell", error:"Game not found"},
        315: {error_code: 315, http_code: "400", function: "questionCell", error:"Invalid cell coordinates"},
        316: {error_code: 316, http_code: "400", function: "revealCell", error:"Undefined cell coordinates"},
        317: {error_code: 317, http_code: "400", function: "revealCell", error:"Game not found"},
        318: {error_code: 318, http_code: "400", function: "revealCell", error:"Invalid cell coordinates"},
    }
    module.exports = errors
    
    