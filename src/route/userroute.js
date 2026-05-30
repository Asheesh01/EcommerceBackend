const express = require('express');
const router = express.Router();
const { signupUSer, loginUser ,profile} = require('../controller/userController')
const authMiddleware=require('../middleware/authMiddleware')
router.post('/signup', signupUSer);
router.post('/login', loginUser)
router.get('/profile',authMiddleware,profile)
module.exports = router;