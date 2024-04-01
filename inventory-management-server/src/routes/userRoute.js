const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/loggedIn", loginStatus);

module.exports = router;
