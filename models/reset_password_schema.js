const mongoose = require('mongoose');
const { model } = require('./userschema');

const resetPasswordSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    accesstoken:{
        type:String 
    },
    valid:{
        type:Boolean
    }

});

const ResetPass = mongoose.model('ResetPass',resetPasswordSchema);

module.exports = ResetPass;