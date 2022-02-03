const { redirect } = require('express/lib/response');
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


module.exports.destroy = function(req,res){
    console.log(req.params.id);
    Comment.findById(req.params.id, function(err, comment){
        //.id is used instead of ._id -> used to convert object to string
        console.log(comment.user);

        if(comment.user==req.user.id){
            let post_id= comment.post;
            comment.remove();
            //function given by mongo to delete many comments with paraameter id 

            Post.findByIdAndUpdate(post_id, {$pull: {Comments: req.params.id }},function(err,post){
                return res.redirect('back');
            })

            
           
        }else{
            return res.redirect('back');
        }
    })
}
