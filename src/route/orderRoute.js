const express=require("express")
const router=express.Router()
const AuthMiddleware=require('../middleware/authMiddleware')
const isUser=require('../middleware/isUser')
const {createOrder,ViewAllOder}=require('../controller/orderController')
router.post('/order',AuthMiddleware,isUser,createOrder)
router.get('/getorder',AuthMiddleware,isUser,ViewAllOder)

module.exports=router;