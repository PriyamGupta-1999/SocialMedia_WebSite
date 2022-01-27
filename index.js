const express=require('express');
const app=express();
const port=8000;

//database 
const db=require('./config/mongoose');


//layouts use  Note: include before views to use them in views
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.static('./assets'));

// for extracting style and script tag into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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