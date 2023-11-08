const express=require('express');
const { signup } = require('../controller/authController');

const authRouter= express.Router();

// I m created the Path and I will made controller for this.......>
authRouter.post('/signup',signup)

module.exports=authRouter;