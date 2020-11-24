const user = require('../models/userschema');
const User = require('../models/userschema');


module.exports.user = function(req,res){
        User.findById(req.params.id,function(err,users)
        {
            res.render('user_profile',{
                h1:"User / Profile",
                profile_user:users
            });
        });
    
} 

module.exports.profile_update = function(req,res){
    if(req.user.id == req.params.id)
    {
    User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err){
            return res.redirect('back');
    });
    }
    else
    {
        return res.status(401).send("<h1>Not Authorized</h1> ");
    }
}

module.exports.endSession_signout = function (req,res) 
{
    req.flash('success','Successfully Logged Out');
    req.logout();
    res.redirect('/home');
    
}