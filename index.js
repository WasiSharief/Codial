

const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
// const path = require('path');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

// const user = require('./models/userschema');
const sassmiddelware = require('node-sass-middleware');

app.use(sassmiddelware({
    src:'./assets/SCSS',
    dest:'./assets/CSS',
    debug:true,
    outputStyle:'extended',
    prefix:'/CSS'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));



app.use(expresslayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true)


app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'codial',
    //need to change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err)
    {
        if(err)
        {
            console(err || "connected mongodb store");
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error while running server:${err}`);
    }
    console.log(`Server running on port: ${port}`);
});