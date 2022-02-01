const { model } = require('mongoose');
const mongoose= require('mongoose');

const postSchema= new mongoose.Schema({
    content:{
        type: String,
        require: true,
    },
    user: {
        //object id is used at is always unique in as we can see in robo 3t 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',//refer to user schema 
    }
    //add time stamps always 
},{
    timestamps: true
})


const Post= mongoose.model('Post', postSchema);

module.exports=Post;
