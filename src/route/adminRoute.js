const express=require('express')
const authmiddleware=require('../middleware/authMiddleware')
const isAdmin=require('../middleware/isAdmin')
const {viewOrder,updateStatus}=require('../controller/adminController')
const router=express.Router();

router.get('/viewOrder',authmiddleware,isAdmin,viewOrder)
router.post('/updatestatus/:id',authmiddleware,isAdmin,updateStatus)


module.exports=router;