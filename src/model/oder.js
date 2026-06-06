const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'productModel',
                required:true
            },
            quantity:Number
            }
    ],
  price:{
        type:Number,
        required:true
    },
     status: {
        type: String,
        enum: ['PENDING', 'PLACED', 'CANCELLED'],
        default: 'PENDING'
    }

    },{timestamps:true})

    const orderModel=mongoose.model('orderModel',orderSchema);
    module.exports=orderModel