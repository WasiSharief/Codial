const user = require('../models/userschema.js');

module.exports.signup_page = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    
    }

    res.render('user_sign_up',{
        h1:"User|Sign-up|page"
    })
}

module.exports.signup = function(req,res)
{   
    if(req.body.password != req.body.confirmpass)
    {
        return res.redirect('back');
    }
    user.findOne({email:req.body.email},function(err,User){
        if(err)
        {
            console.log("error is found");
        }
        if(!User)
        {
            user.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.username
            
               },function(err,newlist){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.end("<h1> user created "+newlist+"</h1>");
                    //  console.log(newlist);
                })
        }else{
            res.redirect('back');
        }
    } )
    
}

