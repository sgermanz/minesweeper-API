function getUserByID(){
    return {
        "_id": "5e54545e4dc3ab191dde34d2",
        "username": "aUsername",
        "password": "aPassword",
        "email": "anEmail@aDomain.com",
        "__v": 0
    }
}

function getUsers(){
    return [
        {
            "_id": "5e54545e4dc3ab191dde34d2",
            "username": "aUsername",
            "password": "aPassword",
            "email": "anEmail@aDomain.com"
        },
        {
            "_id": "5e54545e4dc3ab191dde34d3",
            "username": "anotherUsername",
            "password": "anotherPassword",
            "email": "anotherEmail@aDomain.com"
        },
    ]
}

function userToInsert(){
    return {
        "username": "aUsername",
        "password": "aPassword",
        "email": "anEmail@aDomain.com",
    }
}

function usersToInsert(){
    return [
        {
            "username": "aUsername",
            "password": "aPassword",
            "email": "anEmail@aDomain.com"
        },
        {
            "username": "anotherUsername",
            "password": "anotherPassword",
            "email": "anotherEmail@aDomain.com"
        },
    ]
}

function getUserByIDError(){
    return "getUserByIDError";
}

function getUserByUsernameError(){
    return "getUserByUsernameError";
}

function getUsersError(){
    return "getUsersError";
}

function deleteUserError(){
    return "deleteUserError";
}

function createUserError(){
    return "createUserError";
}

function updateUserError(){
    return "updateUserError";
}

module.exports = {
    getUserByID,
    getUsers,
    userToInsert,
    usersToInsert,
    getUserByIDError,
    getUserByUsernameError,
    getUsersError,
    deleteUserError,
    createUserError,
    updateUserError,
}