const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["USER","ADMIN"],
        default:"USER"
    }
})

const userModel=mongoose.model('userModel' ,userSchema);
module.exports=userModel;