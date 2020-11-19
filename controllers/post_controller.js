
const Post = require('../models/posts');
const comments = require('../models/commentsschema'); 
module.exports.post = function(req,res){
   
        Post.create({
        content:req.body.content,
        user: req.user.id,
     

        },function (err,post) {
        if(err)
        {
            console.log(err);
        }
        // console.log("inside post controller",post.user);
        return  res.redirect('/home');
        })

}


