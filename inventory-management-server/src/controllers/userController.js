const User = require("../models/UserModel");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const cookieOptions = {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    // secure: true,
};

// register user
const registerUser = async (req, res) => {
    try {
        const { name, email, photo, phone, password, bio } = req.body;

        if (
            [name, email, phone, photo, password].some(
                (field) => field?.trim() === ""
            )
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { name }],
        });

        if (existedUser) {
            throw new ApiError(409, "User email or username already exists");
        }

        const createUser = await User.create({
            name: name,
            email: email,
            password: password,
            phone: phone,
            photo: photo,
            bio: bio,
        });

        const token = generateToken(createUser?._id);

        res.cookie("token", token, cookieOptions);

        return res
            .status(200)
            .json(
                new ApiResponse(200, createUser, "User Registered Successfully")
            );
    } catch (error) {
        throw new ApiError(401, error?.message);
    }
};

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Please add email and password");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(400, "User not found, Please Signup");
        }

        const passwordIsCorrect = await bcrypt.compare(
            password,
            user?.password
        );

        const token = generateToken(user?._id);

        if (passwordIsCorrect) {
            res.cookie("token", token, cookieOptions);
        }

        if (user && passwordIsCorrect) {
            return res
                .status(200)
                .json(new ApiResponse(200, user, "User LoggedIn Successfully"));
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "User not found, Please Signup"));
        }
    } catch (error) {
        throw new ApiError(401, error?.message);
    }
};

// logout user
const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, "Successfully logged out"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal Server Error"));
    }
};

// getUser
const getUser = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json(
            new ApiResponse(200, user, "User LoggedIn Successfully")
        );
    } else {
        res.status(400).json(new ApiResponse(200, user, "User Not Found"));
    }
};

// loginStatus
const loginStatus = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        return res.json({ status: true });
    } else {
        return res.json({ status: false });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
};
