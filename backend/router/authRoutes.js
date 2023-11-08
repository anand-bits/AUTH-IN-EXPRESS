const express=require('express');
const { signup, signin } = require('../controller/authController');

const authRouter= express.Router();

// I m created the Path and I will made controller for this.......>
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)

module.exports=authRouter;