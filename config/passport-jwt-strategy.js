const passport=require('passport');


//this code is used to decrypt the jwt header token we have generated previously for sign in purpose 



var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

//we will find jwt from the header token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'codiel';

//done is a call back here 
// we find the user base on payload
passport.use(new JwtStrategy(opts,function(jwtPayLoad, done){
    //find user based on payload 
    //heree we dont need to match password since we are matching the jwt here 
    //here we will find the user and passport will automatically lauch it 
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log('Error in finding in jwt ');
            return;
        }else{
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
    })
}))

module.exports=passport;