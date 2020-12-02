const queue = require('../config/kue');
const User = require('../models/userschema');
const mailers = require('../mailers/reset_password_mailer');
const emailWorker = require('../workers/reset_password_worker');
const resetpassword = require('../models/reset_password_schema');
const crypto = require('crypto');

module.exports.reset = function(req,res){

    res.render('reset_password');
}

module.exports.emailsubmit = async function(req,res)
{
    try{
       let  user = await User.findOne({email:req.body.email})

        if(user)
        {
            let resetEmail = await resetpassword.create({
                user:user.id,
                accesstoken:crypto.randomBytes(20).toString('hex'),
                valid:true   
            })

            let ResetPassword = await  resetEmail.populate('user').execPopulate();

                
                queue.create('resetPassword',ResetPassword ).save(function(err){

                    if(err){console.log("error in creating comment",err); return;}
                    
                    req.flash('success','Password Reset Email Sent, check inbox!');
                    res.redirect('back');
                    return;
                    })

        }
        else{
            
            res.redirect('back');
            return;

        }

    }catch(err){

        console.log("error",err);
        res.redirect('back');
        return;

}
}

module.exports.resetclickLink = function(req,res)
{
   
    resetpassword.findOne({accesstoken:req.params.id},function(err,Usertoken){

        if(Usertoken.valid == true)
        {
            return  res.render('reset_email_form',{
                resetlink:Usertoken
            });
           
        }
        else{
            res.send('<h1>Sorry Token has expired<h1>');
            return;
        }
    });
}

module.exports.createNewPassword = async function(req,res){

    if(req.body.newpassword != req.body.confirmpassword)
    {
        req.flash('error','Entered passwords are not matching');

        return res.redirect('back');
    }
    UserDetails  = await resetpassword.findOne({accesstoken:req.params.id})
    UserDetails.valid=false;
    UserDetails.save();
    

    if(UserDetails.valid == true)
    {
       
        userdetails = await User.findByIdAndUpdate(UserDetails.user)
        userdetails.password = req.body.newpassword;
        userdetails.save();
        

        req.flash('success','Password Changed');
        res.redirect('/home');
        return;
    } 

}