    const express=require('express')
    const router=express.Router();
    const authMiddleware=require('../middleware/authMiddleware')
    const {addProduct}=require('../controller/productController')

    router.post('/addProduct',authMiddleware,addProduct)