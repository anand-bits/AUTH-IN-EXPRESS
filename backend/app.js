const express= require('express')
// const bodyParser = require('body-parser')

const app= express();
// app.use(bodyParser.json());
const authRouter= require('./router/authRoutes.js')

//import The database 
const databaseconnect=require('../backend/config/databaseConfig.js');
const cookieParser= require('cookie-parser')

databaseconnect();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth/',authRouter)


app.use('/',(req,res)=>
{
    res.status(200).json({
        data:'Authorize Server'
    })
})

module.exports=app