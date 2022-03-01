const mongoose=require('mongoose');
const { stringify } = require('querystring');
// import a multer here so that use it specific to avatar 
const multer=require('multer');
const path=require('path');//used to convert below string to path using path 

//path where image is going to save 
const AVATAR_PATH=path.join('/uploads/users/avatar');

const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    },

    name: {
        type: String,
        required: true,
        
    },

    //adding avatar 
    avatar: {
        type: string 
    },
},
{
    timestamps: true,
});


//creating multer stroage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirnam,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const User=mongoose.model('User',userSchema);

module.exports= User;


