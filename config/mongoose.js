const { dodgerblue } = require('color-name');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codiel_development');

const db=mongoose.connection;

db.on('error',console.log.bind(console,"Error in connectign to Mongo db"));

db.once('open',function(){
    console.log('connected to database :: MongoDb');
})

module.exports=db;