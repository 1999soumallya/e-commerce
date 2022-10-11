const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')
const asyncHandler = require('express-async-handler')

const protectRoute = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.user = await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not Authorized , Token failed");
        }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, not token");
    }
});
module.exports = { protectRoute };