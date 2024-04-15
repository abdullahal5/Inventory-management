const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userScema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Please add a name"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password must be up to 6 characters"],
            // maxLength: [23, "Password must not be more than 23 characters"],
        },
        photo: {
            type: String,
            required: [true, "Photo is required"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            default: "+8801914049327",
        },
        bio: {
            type: String,
            default: "bio",
            required: [true, "Phone is required"],
            maxLength: [250, "Bio must not be more than 23 characters"],
        },
    },
    {
        timestamps: true,
    }
);

userScema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User", userScema);

module.exports =  User
