const cartModel = require('../model/cart');
const orderModel = require('../model/oder');
const productModel = require('../model/product');
const userModel = require('../model/user');

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOne({ userId });
        const user=await userModel.findById(userId);
        
        if (!cart) {
            return res.status(401).json({
                message: "Cart is not available"
            })
        }
        if (cart.products.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }
        let totalPrice = 0;
        for (const item of cart.products) {
            const product = await productModel.findById(item.productId);
            totalPrice += product.price * item.quantity;
        }
        user.totalOrders+=1;
        if(user.totalOrders % 3===0){
            user.rewardAvailable=true;  
        }
        if(user.rewardAvailable){
            totalPrice=totalPrice*0.5;
            user.rewardAvailable=false;
        }
        for (const item of cart.products) {
            const product = await productModel.findById(item.productId);
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: "Insufficient stock"
                });
            }
            product.stock -= item.quantity;
            await product.save();
        }
        const order = await orderModel.create({
            userId,
            products: cart.products,
            price: totalPrice,
            status: "PLACED"
        })
        cart.products = [];
        await cart.save()
        return res.status(200).json({
            message: "Oder placed successfully",
            order
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error come in creating the order"
        })

    }
}

const ViewAllOder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ userId });
        if (!orders) {
            return res.status(401).json({
                message: "There is no order available"
            })
        }
        return res.status(200).json({
            orders,
            message: "Order fetched successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error comes on seeing the order"
        })
    }
}
const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(401).json({
                message: "There is no order with this id"
            })
        }
        order.status = "CANCELLED";
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while cancelling order"
        });
    }
}

module.exports = {
    createOrder,
    ViewAllOder,
    cancelOrder

}