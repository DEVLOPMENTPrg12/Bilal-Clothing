const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// جلب السلة
router.get("/", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId }).populate("items.productId");

    // ✅ إذا ماكانش عندو cart، نخلق وحدة جديدة فارغة
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// إضافة منتج مع size و color
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) cart = new Cart({ userId: req.user.userId, items: [] });

    const itemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === productId && i.size === size && i.color === color
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size, color });
    }

    await cart.save();
    const updatedCart = await cart.populate("items.productId");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// حذف منتج من cart
router.delete("/remove", authMiddleware, async (req, res) => {
  try {
    const { productId, size, color } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(item.productId.toString() === productId && item.size === size && item.color === color)
    );

    await cart.save();
    const updatedCart = await cart.populate("items.productId");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// حذف كلشي
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
