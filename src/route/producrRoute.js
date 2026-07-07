    const express=require('express')
    const router=express.Router();
    const authMiddleware=require('../middleware/authMiddleware')
    const isAdmin=require('../middleware/isAdmin')
    const upload=require('../middleware/multer.midlleware')
    const {addProduct,getAllproduct,getProduct,updateProduct,deleteProduct,
        searchProduct,getProductInLimit}=require('../controller/productController')

    router.post('/addProduct',authMiddleware,isAdmin,upload.single("image"),addProduct)
    router.get('/getAllProduct',getAllproduct)
    router.get('/getProduct/:id',getProduct)
    router.put('/updateProduct/:id',authMiddleware,isAdmin,upload.single("image"),updateProduct)
    router.delete('/deleteProduct/:id',authMiddleware,isAdmin,deleteProduct)
    router.get('/searchProduct',searchProduct)
    router.get('/getProductinLimit',getProductInLimit)

    module.exports=router;