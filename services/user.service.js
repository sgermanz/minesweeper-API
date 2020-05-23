'use strict';

var UserRepository = require('../repositories/user.repository')

////////////////////////////////////////////////////////////////////////////////
// MESSAGES
////////////////////////////////////////////////////////////////////////////////

const CREATE_ERROR = "Error creating User";
const DELETE_ERROR = "Error deleting User";
const UPDATE_ERROR = "Error updating User";
const FIND_ONE_BY_ID_ERROR = "Error finding User";
const FIND_ONE_BY_USERNAME_ERROR = "Error finding User";
const FIND_MANY_ERROR = "Error finding Users";

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

async function createUser(user){
    try{
        return UserRepository.createUser(user)
    }
    catch(error){
        throw CREATE_ERROR + JSON.stringify(error);
    }
}

async function removeUser(id){
    try{
        return UserRepository.removeUser(id)
    }
    catch(error){
        throw DELETE_ERROR + JSON.stringify(error);
    }
} 

async function updateUser(user){
    try{
        return UserRepository.updateUser(user);
    }
    catch(error){
        throw UPDATE_ERROR + JSON.stringify(error);
    }
}

async function getUserById(id){
    try{
        return UserRepository.getUserById(id)
    }
    catch(error){
        throw FIND_ONE_BY_ID_ERROR + JSON.stringify(error);
    }
}

async function getUserByUsername(id){
    try{
        return UserRepository.getUserByUsername(id)
    }
    catch(error){
        throw FIND_ONE_BY_USERNAME_ERROR + JSON.stringify(error);
    }
}


async function getUsers(params){
    try{
        var response = await UserRepository.getUsers(params);
        return response;
    }
    catch(error){
        throw FIND_MANY_ERROR + JSON.stringify(error);
    }
}

module.exports = {
    createUser,
    removeUser,
    updateUser,
    getUsers,
    getUserById,
    getUserByUsername
}