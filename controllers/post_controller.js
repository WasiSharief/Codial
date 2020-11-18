const post = require('../models/posts');

module.exports.post = function(req,res){
    if(req.isAuthenticated())
    {
        post.create({
        content:req.body.content,
        user: req.user.id

        },function (err,post) {
        if(err)
        {
            console.log(err);
        }
        console.log("inside post controller",post.user);
        return  res.redirect('/home');
        })

    }
    
    else{

        return res.redirect('/signin/page');

    }

}