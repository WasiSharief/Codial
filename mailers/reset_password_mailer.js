const nodemailer = require('../config/nodemailer');

exports.resetpassword = (resetlink) => {

    let HTMLString = nodemailer.renderTemplate({resetlink:resetlink},'/reset_password/reset_link_form.ejs');

    nodemailer.transporter.sendMail({
        from:'wasispartian@gmail.com',
        to: resetlink.user.email,
        subject:"New Comment Published !",
        html:HTMLString
    },(err,info)=>{
        if(err){console.log("Error in sending Email",err); return;}

        return;

    });
}