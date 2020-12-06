
const Post = require('../models/posts');
const comments = require('../models/commentsschema');
const likes = require('../models/likes');
module.exports.post = async function(req,res){
   let like = false;
       try{
           let post = await Post.create({
        content:req.body.content,
        user: req.user.id,
                                    }); 
                                    

        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            
            
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        
        req.flash('success','Post Created!');
        return  res.redirect('/home');

    }catch(err){
        req.flash('error','Error in Creating Post');
    }
}

module.exports.deletepost = async function(req,res)
{
   
   try{ let post = await  Post.findById(req.params.id)
   
        if(post.user == req.user.id)
        {
            post.remove();
           await comments.deleteMany({post:req.params.id});
           await likes.deleteMany({likeable:req.params.id});
            
            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted"
                })
            }


           req.flash('success','Post Deleted!');
                return res.redirect('back');
        
        }
        else{
            return res.redirect('back');
        }
    }catch(err)
    {
        req.flash('error','Error in Deleting Post');
    }
   
}


