
const express = require('express');

const env = require('./config/environment');
const logger = require('morgan');


const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();

require('./config/view-helpers')(app);
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const path = require('path');

const session = require('express-session');
const passport = require('passport');

const LocalStrategy = require('./config/passport-local-strategy');
const jwtStrategy = require('./config/passport-jwt-strategy');
const GoogleStrategy = require('./config/passport-google-oauth-strategy');


const MongoStore = require('connect-mongo')(session);

// const user = require('./models/userschema');
const sassmiddelware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashmidlwr = require('./config/flashmidlwr');

//setting up chat server to use socket.io 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket.js').ChatSockets(chatServer);
chatServer.listen(5000,'localhost');
console.log('chat server is listining on port 5000');


if(env.name=="development"){
//sass middleware setup
app.use(sassmiddelware({
    src:path.join(__dirname,env.asset_path,'SCSS'),
    dest:path.join(__dirname,env.asset_path,'CSS'),
    debug:true,
    outputStyle:'extended',
    prefix:'/CSS'
}));
}


app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

app.use(express.static(env.asset_path));

//logging console info into file using middleware
app.use(logger(env.morgan.mode,env.morgan.options));

// making uploads path avaialble to profile image submit
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expresslayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true)


app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'codial',
    //need to change the secret before deployment
    secret:env.session_cookie_key,
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
            console.log(err || "connected mongodb store");
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashmidlwr.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error while running server:${err}`);
    }
    console.log(`Server running on port: ${port}`);
});