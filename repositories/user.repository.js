'use strict';
var UserModel = require('../models/user')
var _ = require('lodash');

// var userSchema = Schema({
//     username: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true}
// });

async function createUser(user){
    try{
        var userObj = new UserModel(user);
        return await userObj.save();
    }
    catch(error){
        throw error;
    }
}

async function removeUser(id){
    try{
        return await UserModel.findByIdAndRemove(id);
    }
    catch(error){
        throw error;
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

async function updateUser(user){
    try{
        var userObj = await UserModel.findById(user.id);
        userObj.username = !_.isUndefined(user.username) ? user.username : userObj.username;
        userObj.password = !_.isUndefined(user.password) ? user.password : userObj.password;
        userObj.email = !_.isUndefined(user.email) ? user.email : userObj.email;
        
        return await userObj.save();
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
        throw error;
    }
}

async function getUserByUsername(username){
    try{
        let result = await UserModel.find({username: username})
        return result[0];
    }
    catch(error){
        throw error;
    }
}

async function getUsers(){
    try{
        return await UserModel.find() 
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    createUser,
    removeUser,
    removeAllUsers,
    updateUser,
    getUserById,
    getUserByUsername,
    getUsers
}