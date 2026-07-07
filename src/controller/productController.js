const productModel = require('../model/product')
const userModel = require('../model/user')
const redis = require('../config/redis')
const uploadOnCloudinary = require('../config/cloudinary')
const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload the file first"
            })
        }
        const cloudinaryresponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryresponse) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed"
            });
        }
        console.log(req.body);
        console.log(req.file);
        const adddingproduct = await productModel.create({
            name,
            description,
            price,
            stock,
            category,
            image: cloudinaryresponse.secure_url
        })

        await redis.del("products");
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
        const cached = await redis.get('products')
        if (cached) {
            console.log("Serving from Redis");
            return res.json({
                message: "Serving from redis",
                products: JSON.parse(cached)
            });
        }
        console.log("Serving from mongo db")
        const products = await productModel.find();
        await redis.set(
            "products",
            JSON.stringify(products),
            "EX",
            60
        )
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
        const productId = req.params.id;
        const cached = await redis.get(`product:${productId}`);
        if (cached) {
            return res.json({
                message: "Product fetched successfully",
                product: JSON.parse(cached)
            })
        }
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(401).json({
                message: "Product is not available"
            })
        }
        await redis.set(
            `product:${productId}`,
            JSON.stringify(product),
            "EX",
            60
        )
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
            }, { new: true })
        if (!products) {
            return res.status(401).json({
                message: "Product not found"
            })
        }

        await redis.del(`product:${productId}`);
        await redis.del("products");
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
        await redis.del(`product:${productId}`)
        await redis.del("products")
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

const searchProduct = async (req, res) => {
    try {
        const search = req.query.name;
        const cacheKey = `search:${search}`;
        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.status(200).json({
                message: "data search from cached",
                product: JSON.parse(cached)
            })
        }
        const product = await productModel.find({
            name: {
                $regex: search,
                $options: 'i'
            }
        });
        if (product.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        await redis.set(
            cacheKey,
            JSON.stringify(product),
            "EX",
            60
        )
        return res.status(200).json({
            success: true,
            product

        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            message: "Error comes in searching  the products"
        })
    }
}

getProductInLimit = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const products = await productModel.find().
            skip(skip).
            limit(limit);
        return res.status(200).json({
            success: true,
            page,
            limit,
            count: products.length,
            products
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Products not fetched"
        });
    }
}

module.exports = {
    addProduct,
    getAllproduct,
    updateProduct,
    getProduct,
    deleteProduct,
    searchProduct,
    getProductInLimit
}