//routes for user 

const express=require('express');

const router=express.Router();

//connecting to controller of users 
const userControllers=require('../controllers/user_controller');

router.get('/profile',userControllers.profile);

const user_post_Controllers=require('../controllers/user_post_controller');


router.get('/posts',user_post_Controllers.post);

router.get('/sign-up',userControllers.signUp);

router.get('/sign-in',userControllers.signIn);

router.post('/create',userControllers.create);

router.post('/create-session',userControllers.createSession);


module.exports=router;




//commandd for user posts

