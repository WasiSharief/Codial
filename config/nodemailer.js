const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path  = require('path');
const env = require('./environment');
//setting transporter which will send mail using gmail service from given email and password
//, tls is false to allow third party control to my gmail account
let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/Mailer', relativePath),
        data,
        function(err, template)
        {
            if(err){console.log("error in rendering template",err); return;}
           mailHTML= template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate,   
}