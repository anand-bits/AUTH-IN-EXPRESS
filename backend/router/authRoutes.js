const express=require('express');
const { signup, signin, getUser, logout } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');

const authRouter= express.Router();

// I m created the Path and I will made controller for this.......>
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.get('/user',jwtAuth,getUser)
authRouter.get('/logout',jwtAuth,logout)
module.exports=authRouter;