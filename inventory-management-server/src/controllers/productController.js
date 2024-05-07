const Product = require("../models/ProductModel");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const createProduct = async (req, res) => {
    const { name, category, quantity, price, description, images, user } =
        req.body;
    if (
        [name, category, quantity, price, user].some(
            (item) => item?.trim() === "" || !item
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const product = await Product.create({
            user,
            name,
            category,
            quantity,
            price,
            description,
            images: images,
        });

        console.log(product);

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

// getAllProduct
const getAllProduct = async (req, res) => {
    try {
        const itemPerPage = parseInt(req.query.item);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * itemPerPage;

        const totalItems = await Product.countDocuments();
        const totalPages = Math.ceil(totalItems / itemPerPage);

        const products = await Product.find().skip(skip).limit(itemPerPage);

        const startIndex = (page - 1) * itemPerPage + 1;

        const productIndex = products.map((item, idx) => ({
            ...item,
            id: startIndex + idx,
        }));

        const productData = {
            currentPage: page,
            totalPages: totalPages,
            data: productIndex,
        };

        res.status(200).json(new ApiResponse(200, productData));
    } catch (error) {
        throw new ApiError(
            400,
            error.message,
            "error occured while getting products"
        );
    }
};

const getProductById = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        res.status(200).json(
            new ApiResponse(200, result, "product get successfylly by ID")
        );
    } catch (error) {
        throw new ApiError(
            400,
            error.message,
            "error occured while getting products"
        );
    }
};

const deleteProductById = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(
            new ApiResponse(200, result, "product deleted successfylly")
        );
    } catch (error) {
        throw new ApiError(
            400,
            error.message,
            "error occured while getting products"
        );
    }
};

const updateProduct = async (req, res) => {
    try {
        const query = req.query.id;
        const body = req.body;

        if (!query || !body) {
            return res.status(404).json({ message: "Product not found" });
        }

        const update = await Product.findByIdAndUpdate(query, body);

        if (!update) {
            return res.status(404).json({ message: "Something went wrong" });
        }

        res.status(200).json(
            new ApiResponse(200, update, "product deleted successfylly")
        );
    } catch (error) {
        throw new ApiError(
            400,
            error.message,
            "error occured while updating the product"
        );
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProductById,
    updateProduct,
};
