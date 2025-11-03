const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");

router.get("/fill", async (req, res) => {
  try {
    // 🔹 Users
    const hashed = await bcrypt.hash("123456", 10);
    const users = await User.insertMany([
      { name: "Bilal", email: "bilal@example.com", password: hashed, role: "admin" },
      { name: "Ahmed", email: "ahmed@example.com", password: hashed },
      { name: "Sara", email: "sara@example.com", password: hashed },
    ]);

    // 🔹 Products
    const products = await Product.insertMany([
      { name: "T-Shirt", description: "Cotton T-Shirt", price: 20, stock: 50 },
      { name: "Jeans", description: "Blue Jeans", price: 50, stock: 30 },
      { name: "Jacket", description: "Leather Jacket", price: 120, stock: 10 },
    ]);

    // 🔹 Orders
    await Order.insertMany([
      {
        user: users[1]._id,
        products: [{ product: products[0]._id, quantity: 2 }],
        totalPrice: 40,
      },
      {
        user: users[2]._id,
        products: [
          { product: products[1]._id, quantity: 1 },
          { product: products[2]._id, quantity: 1 },
        ],
        totalPrice: 170,
      },
    ]);

    res.json({ message: "Fake data inserted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
