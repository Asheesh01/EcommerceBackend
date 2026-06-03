const cartModel = require("../model/cart");
const productModel = require("../model/product");

const addCart = async (req, res) => {
   try {
     const userId = req.user.id;
    const { productId } = req.body;
        const product = await productModel.findById(productId);
    if (!product) {
        return res.status(401).json({
            message: "Product is not availabe"
        })
    }
    let cart = await cartModel.findOne({userId});
    if (!cart) {
        cart = await cartModel.create({
            userId,
            
                products: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            })
        return res.status(201).json({
            success: true,
            message: "Item added to the cart",
            cart,product
        })
    }
    const existingCart = cart.products.find(
        item => item.productId.toString() === productId
    );
    if (existingCart) {
      existingCart.quantity += 1;
    }
    else {
        cart.products.push({
            productId,
            quantity: 1
        })
    }
    await cart.save();
    return res.status
    (200).json({
        message:"Item added in the succesfully",
        success:true,
        cart
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Item is not addeed to the cart"
    })
   }

}

const viewAllCart=async(req,res)=>{
try {
    const userId=req.user.id;
const cart=await cartModel.findOne({userId}).populate('products.productId');
return res.status(200).json({
    message:"Cart fetched successfully",
    cart
})
} catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"cart is not fetched"
    })
}
}

module.exports={
    addCart,
    viewAllCart
}