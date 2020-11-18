// console.log(req.cookies);
    // res.cookie('user_id',50);


const post = require('../models/posts');

module.exports.home=function(req,res){
    
   
        post.find({}).populate('user').exec(function (err,posts)
        {
        
        if(err)
        {
            console.log("error in post");
        }
        console.log("inside",posts)
        // console.log(post.content);
        return  res.render('home',{
            h1:"home Page",
            posts:posts
            });      
        });
    
    
}