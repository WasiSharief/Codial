const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userschema');

passport.use(new LocalStrategy({
    usernameField:'email'
    
    },function(email,password, done){
        // finding email and corresponding user details as object
        User.findOne({email:email},function(err,user){
            if(err)
            {
                console.log("error in passport js while authenticating");
                return done(err);
            }
            //if user is not found or password is not matched function will be returned
            if(!user || user.password != password )
            {
                console.log("Invalid username or password");
                return done(null,false);
            }
            
            //returning user details through done function
            return done(null,user);

        });
        
    }
));
//serializeuser means setting cookie id with above user object reterived from database
passport.serializeUser(function(user, done)
{
    
    done(null,user.id);
});

//deserializeuser which is receiving request and splitting cookie id-
// -and matching it with id in database and returning user data with matching id
passport.deserializeUser(function(id, done)
{
    // console.log("inside deserilizer",user);
    User.findById(id,function(err,user){
        if(err)
        {
             
            console.log("error in passport js while authenticating");
            return done(err)
           
        }
        
        return done(null,user);
            
});
});

//check if user is authenticatd before accessing profile page
passport.checkAuthentication = function (req,res,next)
{   
    // if user is logged in then pass on the access to next function controller action for providing page
    if(req.isAuthenticated())
    {
        return next();
    }
 
    return res.redirect('/signin/page');
}

passport.setAuthenticatedUser = function (req,res,next)
{
    if(req.isAuthenticated())
    {
        
        //req.user contains the current signed in user from the session cookies and we are just sending this to the locals for views controller
        res.locals.user  = req.user;
    }
    next();
}

module.exports = passport;