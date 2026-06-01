    const express=require('express')
    const router=express.Router();
    const authMiddleware=require('../middleware/authMiddleware')
    const isAdmin=require('../middleware/isAdmin')
    const {addProduct,getAllproduct,getProduct,updateProduct,deleteProduct}=require('../controller/productController')

    router.post('/addProduct',authMiddleware,isAdmin,addProduct)
    router.get('/getAllProduct',getAllproduct)
    router.get('/getProduct/:id',getProduct)
    router.put('/updateProduct/:id',authMiddleware,isAdmin,updateProduct)
    router.delete('/deleteProduct/:id',authMiddleware,isAdmin,deleteProduct)




    module.exports=router;