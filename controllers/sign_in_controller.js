const express = require('express');
const app = express();




const user = require('../models/userschema');
module.exports.signin_page_control = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }

    res.render('user_sign_in',{
        h1:"User|Sign-in|page"
    })
}

module.exports.signin_createsession_control = function(req,res)
{
    req.flash('success','Successfully logged In');

    return res.redirect('/home');

} 