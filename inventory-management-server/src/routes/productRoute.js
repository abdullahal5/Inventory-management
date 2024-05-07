const { createProduct, getAllProduct, getProductById, deleteProductById, updateProduct } = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/addProduct", createProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductById/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProductById);
router.patch("/updateProduct", updateProduct);

module.exports = router;
