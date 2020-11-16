const User = require('../models/userschema');
module.exports.user = function(req,res){
        
    res.render('user_profile',{
        h1:"This is User rendered EJS file",
        user:req.user
    });
   

} 