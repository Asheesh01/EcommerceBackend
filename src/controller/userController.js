const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupUSer = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: "User already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: '1d' });

        return res.status(200).json({
            message: "User created successfully",
            success: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error comes in signup"
        })

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exists"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: "1d" });
        return res.status(200).json({
            user,
            token
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error come in signup"
        })
    }
}

const profile=async(req,res)=>{
    try {
        const userId=req.user.id;
    if(!userId){
        return res.status(401).json({
            message:"User profile does not exists"
        })
    }
    const user=await userModel.findById(userId);
    return res.status(200).json({
        success:true,
        user,
        message:"User profile fteched successfully"
    })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message:"error comes in fetching the profile"
        })
        
    }
}
module.exports = {
    signupUSer,
    loginUser,
    profile
}