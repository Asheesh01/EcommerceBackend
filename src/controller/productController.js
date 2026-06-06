const productModel = require('../model/product')
const userModel = require('../model/user')
const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        const adddingproduct = await productModel.create({
            name,
            description,
            price,
            stock,
            category
        })

        return res.status(201).json({
            success: true,
            message: "Product add successfully",
            adddingproduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error comes in while adding a product to the card"
        })
    }
}

const getAllproduct = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message: "All prducts fetched",
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            message: "Products not fetched"
        })

    }

}
const getProduct = async (req, res) => {
    try {
        const producrId = req.params.id;
        const product = await productModel.findById(producrId)
        if (!product) {
            return res.status(401).json({
                message: "Product is not available"
            })
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            message: "cannot get the product"
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, stock, category } = req.body;
        const products = await productModel.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                stock,
                category
            })
        if (!products) {
            return res.status(401).json({
                message: "Product not found"
            })
        }
        return res.status(200).json({
            message: "Product update succesfully",
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error "
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findByIdAndDelete(productId);
        if (!product) {
            return res.status(401).json({
                message: "Product is not found"
            })
        }
        return res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            message: "Error comes in deleting the products"
        })

    }
}

module.exports = {
    addProduct,
    getAllproduct,
    updateProduct,
    getProduct,
    deleteProduct
}