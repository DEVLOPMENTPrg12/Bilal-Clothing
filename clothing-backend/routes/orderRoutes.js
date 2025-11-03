const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getMyOrders } = require("../controllers/orderController");


const {
  createOrder,
  getAllOrders,
  getOrderById,
    updateOrderStatus,

} = require("../controllers/orderController");
router.get("/myorders", authMiddleware, getMyOrders);

// ➕ إنشاء order (أي مستخدم مسجل)
router.post("/", authMiddleware, createOrder);

// 📦 جلب كل الطلبات (admin فقط)
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllOrders);

// 🔍 جلب order واحد (user صاحب الطلب أو admin)
router.get("/:id", authMiddleware, getOrderById);
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateOrderStatus
);
module.exports = router;
