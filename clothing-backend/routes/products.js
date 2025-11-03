const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET جميع المنتجات
router.get("/", getProducts);

// GET منتج واحد
router.get("/:id", getProduct);

// Admin routes
router.post("/", authMiddleware, roleMiddleware(["admin"]),createProduct);
router.put("/:id", authMiddleware,roleMiddleware(["admin"]), updateProduct);
router.delete("/:id", authMiddleware,roleMiddleware(["admin"]), deleteProduct);

module.exports = router;
