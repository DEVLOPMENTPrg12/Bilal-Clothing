const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("category"); // ✅ populate category
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  const product = new Product(req.body);
  await product.save();
  const populatedProduct = await product.populate("category"); // ✅ populate before sending
  res.status(201).json(populatedProduct);
};

exports.updateProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category");
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
