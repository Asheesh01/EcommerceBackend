const express=require('express')
const router=express.Router();
const AuthMiddleware=require('../middleware/authMiddleware')
const isUser=require('../middleware/isUser')
const {addCart,viewAllCart}=require('../controller/cartController')
router.post('/addCart',AuthMiddleware,isUser,addCart)
router.post('/viewCart',AuthMiddleware,isUser,viewAllCart)
module.exports=router