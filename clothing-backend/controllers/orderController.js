const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ✅ إنشاء طلب جديد
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, subtotal, shipping, total, fullName, address, city, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ إنشاء order مع معلومات التوصيل مباشرة
    const order = new Order({
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      total,
      fullName,
      address,
      city,
      phone,
      paymentStatus: "pending",
      fulfillmentStatus: "processing",
    });

    await order.save();

    // مسح Cart بعد إنشاء order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de l'ordre." });
  }
};

// ✅ جلب كل الطلبات (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price images");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
  }
};

// ✅ جلب طلب واحد (حسب user أو admin)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("items.productId", "name price images");

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // تحقق: user يمكنه مشاهدة الطلب ديالو فقط
    if (req.user.role !== "admin" && order.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de la commande." });
  }
};
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ خذ الـ userId من التوكن
    const orders = await Order.find({ userId })
      .populate("items.productId", "name price images")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "Aucune commande trouvée." });
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
  }
};
// ✅ تحديث حالة الطلب (Paiement ou Livraison)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, fulfillmentStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (fulfillmentStatus) order.fulfillmentStatus = fulfillmentStatus;

    await order.save();

    res.json({ message: "Statut mis à jour avec succès", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut" });
  }
};

