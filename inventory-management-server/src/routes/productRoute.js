const { createProduct } = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

const router = require("express").Router();

router.post("/addProduct", createProduct);

module.exports = router;
