const User = require("../models/UserModel");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new ApiError(401, "Unauthorized request, please login");
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            throw new ApiError(400, "User not found, please login");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message);
    }
};

module.exports = protect;
