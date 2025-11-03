const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// 📊 Dashboard admin
exports.getDashboard = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();

    res.json({
      message: "Admin dashboard data",
      stats: {
        totalUsers: usersCount,
        totalOrders: ordersCount,
        totalProducts: productsCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👥 جميع المستخدمين
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // بدون الباسورد
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ حذف مستخدم
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
