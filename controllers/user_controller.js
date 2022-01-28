const User = require("../models/user");

module.exports.profile=function(req,res){
    return res.render('user',{
        title: 'Users'
    })
}


//render the sign in page 
module.exports.signUp=function(req, res){
    return res.render('user_sign_up',{
        title: 'codiel | sign Up page'
    });
};


//render the sign up page 
module.exports.signIn=function(req, res){
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
