const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      size: String,
      color: String
    }
  ],
  total: Number,

  // ✅ معلومات التوصيل
  fullName: String,
  address: String,
  phone: String,
  city: String,

  paymentStatus: { type: String, enum: ["paid","pending","failed"], default: "pending" },
  fulfillmentStatus: { type: String, enum: ["processing","shipped","delivered","cancelled"], default: "processing" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
