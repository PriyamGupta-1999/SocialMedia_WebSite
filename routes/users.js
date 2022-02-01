//routes for user 

const express=require('express');
const passport = require('passport');

const router=express.Router();

//connecting to controller of users 
const userControllers=require('../controllers/user_controller');

//check authentication is as a middleware to see if user is authenticated or not before proceeding 
router.get('/profile',passport.checkAuthentication,userControllers.profile);




router.get('/sign-up',userControllers.signUp);

router.get('/sign-in',userControllers.signIn);

router.post('/create',userControllers.create);


// use passport as a middleware to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userControllers.createSession);



router.get('/sign-out',userControllers.destroySession);



module.exports=router;




//commandd for user posts

