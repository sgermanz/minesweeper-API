const passport          = require("passport");
const JwtStrategy       = require('passport-jwt').Strategy;
const LocalStrategy     = require('passport-local').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const bcrypt            = require('bcrypt');
const UserRepository    = require('../repositories/user.repository');

function getPassport(){
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        session: false
    }, async (username, password, done)=>{
        try{
            let data = await UserRepository.getUserByUsername(username)
            if(data === null){
                return done(null, false); 
            } 
            else if(!bcrypt.compareSync(password, data.password)){ 
                return done(null, false); 
            } 
            return done(null, data); 
        }
        catch(err){
            done(err, null)
        }
    }));

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    opts.algorithms = [process.env.JWT_ALGORITHM];

    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        UserRepository.getUserById(jwt_payload.sub)
        .then(data=>{
            if (data === null) {
                return done(null, false);
            }
            else  
                return done(null, data);
            })
            .catch(err=>done(err, null)) 
    }));
    return passport;
}


module.exports = {
    getPassport
};