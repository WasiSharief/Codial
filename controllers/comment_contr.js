
const comments = require('../models/commentsschema'); 
const Post = require('../models/posts');
module.exports.comment = function(req,res)
{
 Post.findById(req.body.post,function(err,posts)
 {
     console.log("post check",posts);

    if(posts){
    comments.create({
     comments:req.body.comment,
     user:req.user.id,
     post:req.body.post

     
    },function(err,comment)
    {
     if(err) {console.log(err); }
        console.log(posts)
        posts.comments.push(comment);
        posts.save();
        console.log("created comment",comment);
        return res.redirect('/home');
    })
 }
        });  
}

module.exports.deletecomment = function(req,res)
{
    comments.findById(req.params.id,function(err,comment){
       
        if(comment.user == req.user.id)
        {
            let postID = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postID,{ $pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });   
        }

        else
        {
            return res.redirect('back');
        }
    
    });

}