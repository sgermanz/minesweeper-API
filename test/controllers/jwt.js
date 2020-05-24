const passport          = require("passport");
const JwtStrategy       = require('passport-jwt').Strategy;
const LocalStrategy     = require('passport-local').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, async (username, password, done)=>{
    let data = {
        "_id": "5e54545e4dc3ab191dde34d2",
        "username": "aUsername",
        "password": "aPassword",
        "email": "anEmail@aDomain.com",
        "role": "admin",
        "__v": 0
    }
    return done(null, data); 
}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'yoursecret';
opts.algorithms = ['HS256'];

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    let data = {
        "_id": "5e54545e4dc3ab191dde34d2",
        "username": "aUsername",
        "password": "aPassword",
        "email": "anEmail@aDomain.com",
        "role": "user",
        "__v": 0
    }
    return done(null, data); 
}));

module.exports = {
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZTZkMThmZTFjMDVkYTFhM2MxMDBjMTUiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0.n-cnRX6tq3x32-UCw3ITwzAu8_rTNNvMcR87cVgYDEY",
    passport: passport
}