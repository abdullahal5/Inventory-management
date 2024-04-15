const User = require("../models/UserModel");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const Token = require("../models/TokenModel");
const sendEmail = require("../utils/sendEmail");

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
            .json(new ApiResponse(500, error.message, "Internal Server Error"));
    }
};

// getUser
const getUser = async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json(
            new ApiResponse(200, user, "User LoggedIn Successfully")
        );
    } else {
        res.status(400).json(new ApiResponse(200, user, "User Not Found"));
    }
};

const getAllUser = async(req, res) =>{
    const users = await User.find().select("-password")
    res.send(users)
}

// loginStatus
const loginStatus = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ status: false });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (verified) {
            return res.status(200).json({ status: true });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, error.message, "Internal Server Error"));
    }
};

// updateUser
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id);
        if (user) {
            const { _id, name, email, photo, phone, bio } = user;

            user.email = email;
            user.name = req.body.name || name;
            user.photo = req.body.photo || photo;
            user.phone = req.body.phone || phone;
            user.bio = req.body.bio || bio;

            const updatedUser = await user.save();
            res.status(200).json(
                new ApiResponse(200, updatedUser, "Updated User Successfully")
            );
        } else {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, error.message, "Internal Server Error"));
    }
};

// changePassword
const changePassword = async (req, res) => {
    const user = await User.findById(req?.user?._id);
    const { oldPassword, password } = req.body;

    if (!user) {
        return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    if (!oldPassword || !password) {
        return res
            .status(404)
            .json(new ApiResponse(404, "Please add old and new password"));
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user?.password);

    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        return res
            .status(200)
            .json(new ApiResponse(200, "Password changed successfully."));
    } else {
        return res
            .status(400)
            .json(new ApiResponse(400, "Old Password Is Incorrect"));
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    let resetToken = crypto.randomBytes(128).toString("hex") + user?._id;

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    await new Token({
        userId: user?._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000),
    }).save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `
        <h2>Hello ${user?.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This link is valid for only 30 minutes</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards...</p>
        <p>Inventory Management</p>
    `;

    const subject = "password reset request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json(new ApiResponse(200, "Reset Email Sent"));
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    error.message,
                    "Email not sent, please try again"
                )
            );
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    getAllUser,
};
