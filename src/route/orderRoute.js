const express=require("express")
const router=express.Router()
const AuthMiddleware=require('../middleware/authMiddleware')
const isUser=require('../middleware/isUser')
const {createOrder,ViewAllOder,cancelOrder}=require('../controller/orderController')
router.post('/order',AuthMiddleware,isUser,createOrder)
router.get('/getorder',AuthMiddleware,isUser,ViewAllOder)
router.delete('/cancelorder/:id',AuthMiddleware,isUser,cancelOrder)


module.exports=router;