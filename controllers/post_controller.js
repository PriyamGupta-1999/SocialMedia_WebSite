const Post = require("../models/post");
const Comment=require('../models/comment');
module.exports.post=function(req,res){
    return res.end('<h1> user posts</h1>');
}
//generally not needed to convert to async await in one level of code 
module.exports.create= async function(req,res){
    console.log('createPost');

    try{
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id,
        })

        return res.redirect('back');
    }catch(err){
        console.log(err);
    }
}

//DELETING THE POSTS
module.exports.destroy = async function(req,res){
    // console.log('11')
    try{
    let post= await Post.findById(req.params.id);
       
    
    //.id is used instead of ._id -> used to convert object to string
    if(post.user==req.user.id){
            post.remove();
            //function given by mongo to delete many comments with paraameter id 
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
    }
}