'use strict';

var UserRepository = require('../repositories/user.repository')
var errorHelper = require('../helpers/error.helper');

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

async function createUser(user){
    try{
        return UserRepository.createUser(user)
    }
    catch(error){
        throw errorHelper.errorPropagation("users", error, 200)
    }
}

async function getUserById(id){
    try{
        return UserRepository.getUserById(id)
    }
    catch(error){
        throw errorHelper.errorPropagation("users", error, 201)
    }
}

async function getUserByUsername(id){
    try{
        return UserRepository.getUserByUsername(id)
    }
    catch(error){
        throw errorHelper.errorPropagation("users", error, 202)
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById
}