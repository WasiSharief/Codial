
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessingLogStream = rfs.createStream('access.log',{

    interval:'1d',
    path:logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db:'codial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'wasispartian@gmail.com',
            pass:'spartianking'
        },
        tls: {
            rejectUnauthorized: false
        }
    
    },
    google_oath_clientID:"285560658772-inijh5qe82dgjvv040qq0gl7kv3ct2f9.apps.googleusercontent.com",
    google_oath_clientSecret:"WKkObU_8GALFwgaXlFVEih-Q",
    google_oath_callbackURL:"http://localhost:8000/user/auth/google/callback",
    jwt_strat_secret_key:'codial',
    morgan:{
        mode:'dev',
        options:{stream:accessingLogStream}
    }
}

const production = {

    name: 'production',
    asset_path:process.env.CODIAL_ASSET_PATH,
    session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:process.env.CODIAL_USER_EMAIL_ID,
            pass:process.env.CODIAL_EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    
    },
    google_oath_clientID:process.env.CODIAL_GOOGLE_OATH_CLIENTID,
    google_oath_clientSecret:process.env.CODIAL_GOOGLE_OATH_CLIENTSECRET,
    google_oath_callbackURL:process.env.CODIAL_GOOGLE_OATH_CALLBACKURL,
    jwt_strat_secret_key:process.env.CODIAL_JWT_SECRET_KEY,
    morgan:{
        mode:'combined',
        options:{stream:accessingLogStream}
    }
}
        
module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);