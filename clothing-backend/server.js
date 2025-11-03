const express = require("express");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/uploadRoutes");

const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes=require("./routes/categoryRoutes")
const fakeDataRoutes = require("./routes/fakeData");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoute");



const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/fake", fakeDataRoutes);
app.use("/api/products", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
