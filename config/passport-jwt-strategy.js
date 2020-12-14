const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/userschema');

const env = require('./environment');
let opts = {
    
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_strat_secret_key

}

passport.use( new JWTStrategy(opts ,function(jwtPayLoad , done){


    User.findById(jwtPayLoad._id,function (err,user) {
        if(err){console.log("error in finding user"); return;}
        
        if(user){
            return done (null,user);
        }
        else{
            return done (null , false);
        }
    })
}));

module.exports = passport;