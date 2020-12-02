const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("inside newComment mailer");

    let HTMLString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodemailer.transporter.sendMail({
        from:'wasispartian@gmail.com',
        to: comment.user.email,
        subject:"New Comment Published !",
        html:HTMLString
    },(err,info)=>{
        if(err){console.log("Error in sending Email",err,comment.user.email); return;}

        // console.log('Email is sent',comment,info);
        return;
    });
}