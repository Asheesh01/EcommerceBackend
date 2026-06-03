const express=require('express')
const router=express.Router();
const AuthMiddleware=require('../middleware/authMiddleware')
const isUser=require('../middleware/isUser')
const {addCart,viewAllCart,deleteCart,deleteSingleCart}=require('../controller/cartController')
router.post('/addCart',AuthMiddleware,isUser,addCart)
router.get('/viewCart',AuthMiddleware,isUser,viewAllCart)
router.delete('/deleteCart',AuthMiddleware,isUser,deleteCart)
router.delete('/deleteCart/:id',AuthMiddleware,isUser,deleteSingleCart)

module.exports=router     