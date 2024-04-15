const User = require("../models/UserModel");
const ApiResponse = require("../utils/ApiResponse");
const sendEmail = require("../utils/sendEmail");

const contactUs = async (req, res) => {
    const { subject, message } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    if (!subject || !message) {
        return res
            .status(400)
            .json(new ApiResponse(400, "Please add subject and email"));
    }

    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.email;

    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json(new ApiResponse(200, "Email sent"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, error.message, "Internal Server Error"));
    }
};

module.exports = contactUs;
