// console.log(req.cookies);
    // res.cookie('user_id',50);


const post = require('../models/posts');
const comments = require('../models/commentsschema');
const user = require('../models/userschema');
const friends = require('../models/friendship_schema');

module.exports.home= async function(req,res){

       
    try{

        let friendlist = await friends.find({});

        console.log("Friendsfull",friendlist);

        

         let posts = await post.find({})
        .populate('user')
        .populate('likes')
        .sort('-createdAt')
        .populate({
            path:'comments',
            populate: {
                path:'user likes'
            }
        });

        console.log("Post likes",posts.likes);

        let users = await user.find({});
        
        return  res.render('home',{
            h1:"home Page",
            posts:posts,
            users:users,
            friendlist:friendlist
                        }); 
        
                    
        }catch(err){
            console.log("error in post");
        }                        

}

// user.find({},function(err,users){

//     post.find({})
// .populate('user')
// .populate({
//     path:'comments',
//     populate: {
//         path:'user'
//     }
// }).exec(function (err,posts)
// {

// if(err)
// {
//     console.log("error in post");
// }

//     return  res.render('home',{
//         h1:"home Page",
//         posts:posts,
//         users:users             

//         });      
//     });

// });
