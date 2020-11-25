// const user = require('../models/userschema');
const User = require('../models/userschema');
const path = require('path');
const fs = require('fs');
const { exists } = require('../models/userschema');
module.exports.user = function(req,res){
        User.findById(req.params.id,function(err,users)
        {
            res.render('user_profile',{
                h1:"User / Profile",
                profile_user:users
            });
        });
    
} 
module.exports.image_preview = function(req,res){

 
 
   
    if(req.xhr)
    {
       
        User.findById(req.user.id,function(err,user){
        
            
            res.status(200).json({
                user:user.avatar
            })
            return ;
        });
    }

}



module.exports.profile_update = async function(req,res){

    if(req.user.id == req.params.id){
    try{
    
   let user = await User.findByIdAndUpdate(req.params.id);
let info = req.file;
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log("******ERROR In AVATAR",err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                    if(req.file)
                    {
                        
                            if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar)))
                            {
                        
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        
                            }  
                        
                        user.avatar = User.avatarPath +'/'+ req.file.filename;
                        user.fileinfo = req.file.size / 1000;
                        user.save();
                        return res.redirect('back');  
                    }

            });

    }

catch(err){
     req.flash('Error','Error while editing profile info');
     return res.redirect('back');
    }
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