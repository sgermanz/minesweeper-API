'use strict';

var _ = require('lodash');

const userService = require('../services/user.service');
const bcrypt    = require('bcrypt');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
var messageHelper = require('../helpers/message.helper');
var errorHelper = require('../helpers/error.helper');


////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[User Controller]';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

async function register(req, res) {
    try{
        let data = await userService.getUserByUsername(req.body.username)
        if (data != undefined) { 
            throw errorHelper.getError(319)
        }
        else { 
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
    catch(error){ 
        errorHelper.errorResponse(res, error, 318);
    }
}

async function login(req, res, next){
    try{
        passport.authenticate("local", { session: false }, (error, user) => {
            if (error || !user) {
                throw errorHelper.getError(321)
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
    catch(error){
        errorHelper.errorResponse(res, error, 320);
    }
}

module.exports = {
    register,
    login
}