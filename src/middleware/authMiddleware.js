const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({
                message: "token does not exists"
            })
        }
        const token = authHeader.split(' ')[1];
        const verifytoken = jwt.verify(token, process.env.SECRETKEY);
        req.user = verifytoken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error come in authMiddleware"
        })

    }
}
module.exports=authMiddleware;