const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt= require('bcrypt')


const JWT= require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name Is Must required"],
        minLength: [5, 'Name must be At least 5 characters'],
        maxLength: [50, 'Name Must be less than 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'User email is Required'],
        unique: [true, "User is Already used"],
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
    },
    forgetPasswordToken: {
        type: String,
    },
    forgetPasswordExpiryDate: { // Corrected the field name
        type: Date,
    }
}, {
    timestamps: true
});

//Bcryption is done here And Password will be encrypted ------------------------->

userSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))
    {
        return next();


    }
    this.password= await bcrypt.hash(this.password,10)
    return next()
})

//mongoose Give special power to generate custom method................>>>>>>>>>>>

userSchema.methods={

    jwtToken()
    {
        return JWT.sign(
            {id:this.id,email:this.email},
            process.env.SECRET,
            { 
                expiresIn:'24h'
            }

           



        )
    }

}



const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
