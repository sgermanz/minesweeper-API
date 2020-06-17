/*
Error:
    http code
    error code
    message
*/

const errors = {

    /*****storage*****/
        100: {error_code: 100, http_code: "500", function: "createUser", error:"Unexpected Errsor"},
        101: {error_code: 101, http_code: "500", function: "removeAllUsers", error:"Unexpected Error"},
        102: {error_code: 102, http_code: "500", function: "getUserById", error:"Unexpected Error"},
        103: {error_code: 103, http_code: "500", function: "getUserByUsername", error:"Unexpected Error"},
    /*****service*****/
        200: {error_code: 200, http_code: "500", function: "createUser", error:"Unexpected Error"},
        201: {error_code: 201, http_code: "500", function: "getUserById", error:"Unexpected Error"},
        202: {error_code: 202, http_code: "500", function: "getUserByUsername", error:"Unexpected Error"},
    /*****controller*****/
        300: {error_code: 300, http_code: "500", function: "register", error:"Unexpected Error"},
        301: {error_code: 301, http_code: "500", function: "login", error:"Unexpected Error"},
        302: {error_code: 302, http_code: "400", function: "register", error:"Missing user data"},
        303: {error_code: 303, http_code: "400", function: "register", error:"Invalid user or password"},
    }
    module.exports = errors

