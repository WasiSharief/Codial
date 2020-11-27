const Post = require('../../../models/posts');
const comments = require('../../../models/commentsschema');

module.exports.index = async function(req,res)
{
    
       
        let posts = await Post.find({})
       .sort('-createdAt')
       .populate('user')
       .populate({
           path:'comments',
           populate: {
               path:'user'
           }
       });
       return res.json(200,{
        message:"posts api",
        posts:posts
    })
    
      

}

module.exports.deletepost = async function(req,res)
{
    try{
        
         let post = await  Post.findById(req.params.id)

        
         if(post.user == req.user.id){ 
       
            post.remove();
           await comments.deleteMany({post:req.params.id});
           
                return res.json(200,{
                    message:"Post Deleted successfully"
                });

            }else{

                return res.json(401,{
                    message:"Your not authorized to delete"
                })
            }
       
    }catch(err)
    {
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}