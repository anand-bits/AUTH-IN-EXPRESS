const mongoose= require('mongoose')

//Database Connection----------------------------------------->>>>>>>>>>>>>>>>

const databaseconnect=()=>
{
    mongoose.connect(process.env.MONGO_URI)
    .then((conn)=>
    {
        console.log(`Connected to DB:${conn.connection.host}`)
    })
    .catch((err)=>
    {
        console.log(err);

    })
}

module.exports= databaseconnect;