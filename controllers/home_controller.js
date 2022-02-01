const Post = require("../models/post");

module.exports.home=function(req,res){

    // console.log(req.cookies);

    // just display user id 

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codiel | Home",
    //         posts: posts
    //     })
    // })

    //display whole as user POPULATING THE USER

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home', {
            title: "Codiel | Home",
            posts: posts
        })
    })
}

