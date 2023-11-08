const express= require('express')
// const bodyParser = require('body-parser')

const app= express();
// app.use(bodyParser.json());
const authRouter= require('./router/authRoutes.js')

//import The database 
const databaseconnect=require('../backend/config/databaseConfig.js');

databaseconnect();
app.use(express.json());

app.use('/api/auth/',authRouter)


app.use('/',(req,res)=>
{
    res.status(200).json({
        data:'Authorize Server'
    })
})

module.exports=app