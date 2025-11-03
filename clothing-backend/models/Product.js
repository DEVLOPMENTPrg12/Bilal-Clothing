const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  sizes: [String],
  colors: [String],
  images: [String],
  stock: Map,  // example: { "S": 10, "M": 5 }
  tags: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // علاقة مع Category
  },
},{ timestamps: true });
productSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
