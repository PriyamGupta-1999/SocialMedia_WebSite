const express=require('express');
const app=express();
const port=8000;
//cookie parser
// const cookieParser=require('cookie-parser');
//database 
const db=require('./config/mongoose');


//layouts use  Note: include before views to use them in views
const expressLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');


//used for the cookie session 
const session = require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');

app.use(expressLayouts);

app.use(express.static('./assets'));

//parser for requested objects
app.use(express.urlencoded());

//adding parser for cookies which can be used as middleware
app.use(cookieParser());

// for extracting style and script tag into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting view engine
app.set('view engine','ejs');
app.set('views','./views');



//midddlware for key 
app.use(session({
    name: 'codeial',
    //to do change the secret before deployment in productionm mode 
    secret: 'blashsomething',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//uisng router of routes
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`error: ${port}`);
    }

    console.log(`server is running up ${port}`);
})