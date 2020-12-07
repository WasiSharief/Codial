// const user = require('../models/userschema');
const User = require('../models/userschema');
const path = require('path');
const fs = require('fs');
const friendShip = require('../models/friendship_schema');
const { exists } = require('../models/userschema');
const Friendship = require('../models/friendship_schema');

module.exports.user = async function(req,res){

    let Friendlist = await Friendship.find({})

       let users = await User.findById(req.params.id)
        
          return res.render('user_profile',{
                h1:"User / Profile",
                profile_user:users,
                Friendlist:Friendlist
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

module.exports.addFriend = async function(req,res){

 let friends = await Friendship.create({
     fromuser:req.query.fid,
     touser:req.query.uid
 })    

return res.json(200,{
    data:{
    message:"Success fully added"
}
})

}

module.exports.unfriend = async function(req,res)
{
   await Friendship.deleteOne({
        fromuser:req.query.fid,
        touser:req.query.uid
    })
    return res.json(200,{
        data:{
            message:"Successfully deleted"
        }
    })
}