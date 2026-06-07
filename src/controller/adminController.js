const orderModel = require('../model/oder')
const viewOrder = async (req, res) => {
    try {
        const order = await orderModel.find().
            populate('userId').
            populate('products.productId');

        return res.status(200).json({
            message: "All order are fetched successfully",
            order
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error comes in fetching the All the orders"
        })
    }
}
const updateStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(401).json({
                message: "there is no order avaialble"
            })
        }
        order.status=status;
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Order status updated",
            order
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error comes in updating the status"
        })
    }
}
module.exports = {
    viewOrder,
    updateStatus
}