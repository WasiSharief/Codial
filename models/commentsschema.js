const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({
    comments:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{timestamps:true});


const comments = mongoose.model('comments',commentschema);

module.exports = comments;