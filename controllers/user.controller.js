'use strict';

var _ = require('lodash');

const userService = require('../services/user.service');
const bcrypt    = require('bcrypt');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[User Controller]';

// Error Messages
const REGISTRATION_ERROR = 'Registration Error';
const LOGIN_ERROR = 'Login Error';
const USER_EXISTS = 'User Exists';

// Success Messages

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////


async function register(req, res) {
    try{
        let data = await userService.getUserByUsername(req.body.username)
        if (data && !data.length == 0) { //si el usuario existe
            console.log("Error:", USER_EXISTS);
        }
        else { //si no existe el usuario se crea/registra
            var hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
            let document = {
                username: req.body.username,
                email: req.body.email || '',
                password: hash
            };
            let inserted = await userService.createUser(document);
            res.json({ data: inserted });

        }
    }
    catch(err){ 
        console.log("Error:", REGISTRATION_ERROR + err);
    }
}

async function login(req, res, next){
    passport.authenticate("local", { session: false }, (error, user) => {
        if (error || !user) {
            console.log("Error", LOGIN_ERROR);
        }else {
            const payload = {
                sub: user._id,
                exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                username: user.username,
                role: user.role
            };
            const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
            res.json({ data: { token: token, username: user.username, role: user.role, id: user._id } });
        }

    })(req, res);
}

module.exports = {
    register,
    login
}