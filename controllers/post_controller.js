const Post = require("../models/post");

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