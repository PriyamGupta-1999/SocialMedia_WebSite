const Post = require("../models/post");
const Comment=require('../models/comment');
module.exports.post=function(req,res){
    return res.end('<h1> user posts</h1>');
}

module.exports.create=function(req,res){
    console.log('createPost');
    Post.create({
        content: req.body.content,
        user: req.user._id,
    },function(err,post){
        if(err){ console.log('error in creating the Post');
            return;
        }

        return res.redirect('back');
    })
}

//DELETING THE POSTS
module.exports.destroy = function(req,res){
    // console.log('11')
    Post.findById(req.params.id, function(err, post){
        //.id is used instead of ._id -> used to convert object to string
        if(post.user==req.user.id){
            post.remove();
            //function given by mongo to delete many comments with paraameter id 
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}