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