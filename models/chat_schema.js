const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({

    chatroom:{
        type:String,
        require:true
    },
    sender:{
        type:String,
        require:true
    },
    receiver:{
        type:String,
        require:true
    },
    between:{//mention both the users emailid to fetch the data
        type:String,
        require:true
    }

},{timestamps:true})

const chatdata = mongoose.model('chatdata',chatSchema);

module.exports = chatdata;
