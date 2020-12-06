
const comments = require('../models/commentsschema'); 
const Post = require('../models/posts');
const mailers = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const emailWorker = require('../workers/comments_email_worker');
const likes = require('../models/likes');
module.exports.comment = async function(req,res)
{
    
    
    try{
        let post = await Post.findById(req.body.post)
       
        if(post){
           
        let comment = await comments.create({
         comments:req.body.comment,
         user:req.user.id,
         post:req.body.post })
            
         post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email').execPopulate();

            
            queue.create('emails',comment).save(function(err){
                if(err){console.log("error in creating comment",err); return;}
             
            });
            // mailers.newComment(comment);


            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            // req.flash('success','Commented Post');
            res.redirect('/home');
        }
        }catch(err){
           return req.flash('Error','Error while commenting on post');
        }        
}



module.exports.deletecomment = async function(req,res)
{
        
        try{
        let comment = await comments.findById(req.params.id)
        
        // let post = await Post.findById(comment.post);
        await likes.deleteMany({likeable:req.params.id});
        
        if(comment.user == req.user.id || req.user.id == post.user)
        {
            let postID = comment.post;
            comment.remove();

            
            let post = await Post.findByIdAndUpdate(postID,{ $pull:{comments:req.params.id}});
            
            
            
           if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
          
           req.flash('success','Comment Deleted!');
                return res.redirect('back'); 
        }
        else
        {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err)
    {
        req.flash('Error','Error while deleting commenting');
        return;
    }
    
}