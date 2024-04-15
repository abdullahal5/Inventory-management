const Product = require("../models/ProductModel");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const uploadOnCloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
    console.log(req.body);
    const { name, category, quantity, price, description, image } = req.body;

    if (
        [name, category, quantity, price, description].some(
            (item) => item?.trim() === "" || !item
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const product = await Product.create({
            user: req?.user?._id,
            name,
            category,
            quantity,
            price,
            description,
            image: image,
        });

        res.status(200).json(
            new ApiResponse(200, product, "product created successfylly")
        );
    } catch (error) {
        throw new ApiError(
            400,
            error.message,
            "error occured while product creating"
        );
    }
};

module.exports = {
    createProduct,
};
