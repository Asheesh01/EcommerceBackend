const express=require('express');
const router=express.Router();
const{signupUSer,loginUser}=require('../controller/userController')
router.post('/signup',signupUSer);
router.post('/login',loginUser)

module.exports=router;