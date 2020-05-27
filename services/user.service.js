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
        throw errorHelper.errorPropagation(error, 206)
    }
}

async function getUserById(id){
    try{
        return UserRepository.getUserById(id)
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 205)
    }
}

async function getUserByUsername(id){
    try{
        return UserRepository.getUserByUsername(id)
    }
    catch(error){
        throw errorHelper.errorPropagation(error, 205)
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById
}