const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getDashboard, getAllUsers, deleteUser,editRole } = require("../controllers/adminController");

// 🧭 لوحة تحكم الأدمن (Dashboard)
router.get("/dashboard", authMiddleware, roleMiddleware(["admin"]), getDashboard);

// 👥 عرض جميع المستخدمين
router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

// ❌ حذف مستخدم معين
router.delete("/users/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);
router.put("/admin/users/:id",authMiddleware, roleMiddleware(["admin"]),editRole);


module.exports = router;
