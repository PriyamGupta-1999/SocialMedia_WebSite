const Post = require("../models/post");
const User = require("../models/user");

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
    
    //for only populating user 
    // Post.find({}).populate('user').exec(function(err,posts){
    //     return res.render('home', {
    //         title: "Codiel | Home",
    //         posts: posts
    //     })
    // })

    //for populatingj user commnetns and user that commentted on the comment 
    Post.find({})
    .populate('user')
    .populate({
        path: 'Comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        //query to find all the users 
        User.find({},function(err,users){
            return res.render('home', {
                title: "Codiel | Home",
                posts: posts,
                all_users: users
            })
        })
        
    })
}

