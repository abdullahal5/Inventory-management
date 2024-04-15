const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: [true, "please add a name"],
            trim: true,
        },
        category: {
            type: String,
            required: [true, "please add a category"],
            trim: true,
        },
        quantity: {
            type: String,
            required: [true, "please add quantity"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "please add price"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "please add description"],
            trim: true,
        },
        image: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
