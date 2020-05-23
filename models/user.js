'use strict'

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var role_user = process.env.ROLE_USER

var userSchema = Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String},
    password: {type: String, required: true},
    role: {type: String, default: role_user}

});

module.exports = mongoose.model('user', userSchema, "users");