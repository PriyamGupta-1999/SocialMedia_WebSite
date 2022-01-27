//routes for user 

const express=require('express');

const router=express.Router();

//connecting to controller of users 
const userControllers=require('../controllers/user_controller');

router.get('/profile',userControllers.profile);

const user_post_Controllers=require('../controllers/user_post_controller');


router.use('/posts',user_post_Controllers.post);
module.exports=router;

//commandd for user posts

