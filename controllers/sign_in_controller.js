const express = require('express');
const app = express();




const user = require('../models/userschema');
module.exports.signin_page_control = function(req,res)
{
    res.render('user_sign_in',{
        h1:"User|Sign-in|page"
    })
}





module.exports.signin_createsession_control = function(req,res)
{
    user.find({},function(err,user){
        console.log(user[0].password);
        if(user[0].email == req.body.email&&user[0].password == req.body.password)
        {
            res.end("<h1>login succesful</h1>");
        }
        
        else{
            res.end("<h1>login failed</h1>");
        }
    
})
} 