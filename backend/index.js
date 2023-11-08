require('dotenv').config();

const PORT= process.env.PORT ||5000;

const app= require('./app.js')

app.listen(PORT,(req,res)=>
{
    console.log(`Server is listening at ${PORT}`)
})

