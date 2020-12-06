const mongoose = require('mongoose');

const likeschmea = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
        },
        onModel:{
            type:String,
            require:true,
            enum:['Post','comments']
        }
    
},{
    timestamps:true 
});

const likes = mongoose.model('likes' , likeschmea);

module.exports = likes;