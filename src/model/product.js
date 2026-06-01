const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String
    }
},
{
    timestamps:true
}
);

const productModel=mongoose.model('productModel',productSchema);
module.exports=productModel;