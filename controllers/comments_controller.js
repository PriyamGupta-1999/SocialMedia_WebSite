const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create= function(req,res){
    //here we need to make sure only authenticated user is allowed to add comments to the post

    
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            }, function(err,comment){
                //we need to handle error 
                if(err){
                    console.log('unable to addd the error ');
                }
                // adding comment to array of posts 
                console.log(comment);
                // post.Comments.push(comment);
                post.Comments.push(comment);
                post.save();//save the comments to the post 
                res.redirect('/');//redirect it to save it 
            })
        }
    })
}
