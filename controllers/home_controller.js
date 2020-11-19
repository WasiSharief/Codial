// console.log(req.cookies);
    // res.cookie('user_id',50);


const post = require('../models/posts');
const comments = require('../models/commentsschema');
module.exports.home=function(req,res){
    
   
        post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            }
        }).exec(function (err,posts)
        {
        
        if(err)
        {
            console.log("error in post");
        }
        
            return  res.render('home',{
                h1:"home Page",
                posts:posts
                
                });      
            });
    
}