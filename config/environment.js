const fs= require('fs')
const rfs=require('rotating-file-stream')
const path=require('path')

const logDirectory= path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

console.log("*******",logDirectory);
const accessLogStream= rfs.createStream('access.log',{
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    compress: "gzip",
    path: logDirectory
})

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codiel_production',
    google_client_id:"339124135566-61le7btlld5tte761nmv5jo3t8pc27eu.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback", //matched from google credenetials 
    jwt_secret:'codiel',
    morgan: {
        mode: 'dev',
        options: {stream : accessLogStream}
    },
}

const production ={
    name: 'production',
    asset_path: process.env.CODIEAL_ASSET_PATH,
    session_cookie_key: process.env.CODIEAL_SESSION_COOKIE_KEY,
    db: 'codiel_development',
    google_client_id:process.env.CODIEAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODIEAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback", //matched from google credenetials 
    // jwt_secret:'codiel',
    jwt_secret:process.env.CODIEAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream : accessLogStream}
    }
}

//NOT KNOWN

module.exports= eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV) ;


