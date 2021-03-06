const User = require("../models/user");

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user: user,
        });
    })
    // return res.render('user_profile',{
    //     title: 'Users'
    // })
}

//update the profile 
module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Profile Updated');

            return res.redirect('back');
        });
    }else{
        
        return res.status(401).send('Unauthorized');
    }
}

//render the sign in page 
module.exports.signUp=function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    req.flash('success','Signed Up succesfully');

    return res.render('user_sign_up',{
        title: 'codiel | sign Up page'
    });
};


//render the sign up page 
module.exports.signIn=function(req, res){

    if(req.isAuthenticated()){
        req.flash('success','Welcome ${req.user.name}');
        return res.redirect('/users/profile');
     }

    

    return res.render('user_sign_in',{
        title: 'codiel | sign in page'
    });
};


//get the sign up data
module.exports.create=function(req,res){
    //todo later
}

//get the sign up data
module.exports.createSession=function(req,res){
    //todo later
    console.log('in createSession');
    req.flash('success','Logged in Succesfully');
    return res.redirect('/');
}

//creating controller for create after signup
module.exports.create=function(req,res){

    //go back if password doesnt match 
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //finding if user is already present or not 

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while sighning up');
                    return;
                }

                return res.redirect('/users/sign-in');

            })
        }else{
            return res.redirect('back');
        }
    })
}

//for sign out 
module.exports.destroySession= function(req,res){
    req.logout();
    req.flash('success','You have logged out ');

    return res.redirect('/');
}


