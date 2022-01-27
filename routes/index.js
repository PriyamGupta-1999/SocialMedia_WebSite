const { kMaxLength } = require('buffer');
const express=require('express');
const { append } = require('vary');
const router =express.Router();


const homecontroller=require('../controllers/home_controller');
console.log('ruter loaded');

router.get('/',homecontroller.home);
router.use('/users',require('./users'));
module.exports=router;