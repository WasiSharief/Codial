const User = require('../models/userschema');
module.exports.user = function(req,res){
        
    res.render('user_profile',{
        h1:"User / Profile",
        user:req.user
    });
   

} 
module.exports.endSession_signout = function (req,res) 
{
    req.logout();
    res.redirect('/home');
    
}