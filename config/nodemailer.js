const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path  = require('path');

//setting transporter which will send mail using gmail service from given email and password
//, tls is false to allow third party control to my gmail account
let transporter = nodemailer.createTransport({
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

});
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