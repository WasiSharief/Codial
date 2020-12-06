const post = require('../models/posts');
const comments = require('../models/commentsschema');
const likes = require('../models/likes');


module.exports.toggleliker = async function(req,res){

                let likeable;
                let deleted = false;
                //likes/toggle/?id=123&type=post

                if(req.query.type=="Post")
                {

                    likeable = await post.findById(req.query.id).populate('likes');
                }
                else{

                    likeable = await comments.findById(req.query.id).populate('likes');
                
                }

                let count = likeable.likes.length;
                //if like already exist delete it or create new
                let existingLike = await likes.findOne({
                    likeable:req.query.id,
                    onModel:req.query.type,
                    user:req.user._id

                })

                if(existingLike)
                {
                    likeable.likes.pull(existingLike._id);
                    likeable.save();
                    existingLike.remove();
                    deleted = true;
                }
                else{
                    let newlike = await likes.create({
                        user:req.user._id,
                        likeable:req.query.id,
                        onModel:req.query.type
                    });
                    likeable.likes.push(newlike._id);
                    likeable.save();
                }

                return res.json(200,{
                   message:'Request Successfull',
                   data:{
                       deleted:deleted,
                       count:count
                   } 
                })

}