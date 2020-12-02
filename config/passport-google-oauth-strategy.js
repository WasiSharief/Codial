const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/userschema');

// telling passport to use new strategy for google login
passport.use(new GoogleStrategy({
    clientID:"285560658772-inijh5qe82dgjvv040qq0gl7kv3ct2f9.apps.googleusercontent.com",
    clientSecret:"WKkObU_8GALFwgaXlFVEih-Q",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){

    //find a user 
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log("error in finding user email of googlestrategy",err); return;}

        console.log(profile);
        console.log(accessToken,refreshToken);
        //if found set this user as req.user
        if(user){

            return done(null,user);
        }else{
            // if not found create the user and set it as req.user 
            User.create({
                name:profile.displayName,
                email:profile.email[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log("error in creating user of google strategy",err); return;}

                return done(null,user);
            });
        }
    });
}
));

module.exports = passport;