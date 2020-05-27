'use strict';
var UserModel = require('../models/user')
var _ = require('lodash');
var errorHelper = require('../helpers/error.helper');

// var userSchema = Schema({
//     username: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true}
// });

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

async function createUser(user){
    try{
        var userObj = new UserModel(user);

        return await userObj.save();
    }
    catch(error){
        throw errorHelper.getError(106)
    }
}

async function removeAllUsers(){
    try{
        return await UserModel.remove({});
    }
    catch(error){
        throw error;
    }
} 

async function getUserById(id){
    try{
        return await UserModel.findById(id)
    }
    catch(error){
        throw errorHelper.getError(105)
    }
}

async function getUserByUsername(username){
    try{
        let result = await UserModel.find({username: username})
        return result[0];
    }
    catch(error){
        throw errorHelper.getError(105)
    }
}

module.exports = {
    createUser,
    removeAllUsers,
    getUserById,
    getUserByUsername,
}