
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

module.exports.deletepost = function(req,res)
{
    console.log("data inside params",req.params.id);
    Post.findById(req.params.id,function(err,post)
    {
        if(post.user == req.user.id)
        {
            post.remove();
            comments.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}

