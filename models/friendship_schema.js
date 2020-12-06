const mongoose = require('mongoose');

const friendshipSchema = mongoose.Schema({

    fromuser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    touser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true});

const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship;