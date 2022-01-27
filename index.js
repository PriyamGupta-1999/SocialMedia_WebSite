const express=require('express');
const app=express();
const port=8000;

//setting view engine
app.set('view engine','ejs');
app.set('views','./views');

//uisng router of routes
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`error: ${port}`);
    }

    console.log(`server is running up ${port}`);
})