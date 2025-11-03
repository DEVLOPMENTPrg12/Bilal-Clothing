require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // مسح البيانات القديمة
    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
    ]);
    console.log("🧹 Old data cleared");

    // إنشاء المستخدمين
    const hashed = await bcrypt.hash("123456", 10);
    await User.insertMany([
      { name: "Bilal", email: "bilal@example.com", passwordHash: hashed, role: "admin" },
      { name: "Ahmed", email: "ahmed@example.com", passwordHash: hashed, role: "user" },
    ]);
    console.log("👤 Users created");

    // إنشاء التصنيفات (Men / Women فقط)
    const categories = await Category.insertMany([
      { name: "Men" },
      { name: "Women" },
    ]);
    console.log("🗂 Categories created");

    // إنشاء منتجات الرجال والنساء فقط
    const products = [
      // 👕 MEN
      {
        name: "Classic White T-shirt",
        slug: "classic-white-tshirt",
        description: "Premium cotton T-shirt, soft and breathable for everyday wear.",
        price: 180,
        sizes: ["S", "M", "L", "XL"],
        colors: ["white", "black"],
        stock: { S: 10, M: 15, L: 12, XL: 8 },
        tags: ["men", "casual", "summer"],
        category: categories[0]._id,
        images: [
          "/uploads/tshirt1-1.avif",
          "/uploads/tshirt1-2.avif",
          "/uploads/tshirt1-3.avif",
          "/uploads/tshirt1-4.avif",
        ],
      },
      {
        name: "Slim Fit Blue Jeans",
        slug: "slim-fit-blue-jeans",
        description: "Slim-fit denim jeans for a modern and casual look.",
        price: 350,
        sizes: ["M", "L", "XL"],
        colors: ["blue"],
        stock: { M: 10, L: 8, XL: 6 },
        tags: ["men", "denim", "casual"],
        category: categories[0]._id,
        images: [
          "/uploads/jeans1-1.avif",
          "/uploads/jeans1-2.avif",
          "/uploads/jeans1-3.avif",
          "/uploads/jeans1-4.avif",
        ],
      },
      {
        name: "Black Leather Jacket",
        slug: "black-leather-jacket",
        description: "Timeless black leather jacket for stylish men.",
        price: 700,
        sizes: ["M", "L", "XL"],
        colors: ["black"],
        stock: { M: 6, L: 5, XL: 4 },
        tags: ["men", "jacket", "leather"],
        category: categories[0]._id,
        images: [
          "/uploads/jacket1-1.avif",
          "/uploads/jacket1-2.avif",
          "/uploads/jacket1-3.avif",
          "/uploads/jacket1-4.avif",
        ],
      },
      {
        name: "Men’s Hoodie Sweatshirt",
        slug: "mens-hoodie-sweatshirt",
        description: "Warm and soft hoodie sweatshirt made with cotton fleece.",
        price: 290,
        sizes: ["M", "L", "XL"],
        colors: ["gray", "black"],
        stock: { M: 10, L: 10, XL: 5 },
        tags: ["men", "hoodie", "winter"],
        category: categories[0]._id,
        images: [
          "/uploads/hoodie1-1.avif",
          "/uploads/hoodie1-2.avif",
          "/uploads/hoodie1-3.avif",
          "/uploads/hoodie1-4.avif",
        ],
      },
      {
        name: "Men’s Cotton Polo Shirt",
        slug: "mens-cotton-polo-shirt",
        description: "Elegant cotton polo shirt with short sleeves and slim fit.",
        price: 250,
        sizes: ["S", "M", "L", "XL"],
        colors: ["navy", "white"],
        stock: { S: 10, M: 12, L: 8, XL: 6 },
        tags: ["men", "polo", "casual"],
        category: categories[0]._id,
        images: [
          "/uploads/polo1-1.avif",
          "/uploads/polo1-2.avif",
          "/uploads/polo1-3.avif",
          "/uploads/polo1-4.avif",
        ],
      },

      // 👗 WOMEN
      {
        name: "Elegant Red Dress",
        slug: "elegant-red-dress",
        description: "Flowy red evening dress perfect for formal occasions.",
        price: 550,
        sizes: ["S", "M", "L"],
        colors: ["red"],
        stock: { S: 4, M: 6, L: 3 },
        tags: ["women", "dress", "party"],
        category: categories[1]._id,
        images: [
          "/uploads/dress1-1.avif",
          "/uploads/dress1-2.avif",
          "/uploads/dress1-3.avif",
          "/uploads/dress1-4.avif",
        ],
      },
      {
        name: "Beige Trench Coat",
        slug: "beige-trench-coat",
        description: "Classic women’s trench coat with a slim elegant fit.",
        price: 620,
        sizes: ["S", "M", "L"],
        colors: ["beige"],
        stock: { S: 5, M: 7, L: 5 },
        tags: ["women", "coat", "autumn"],
        category: categories[1]._id,
        images: [
          "/uploads/trench1-1.avif",
          "/uploads/trench1-2.avif",
          "/uploads/trench1-3.avif",
          "/uploads/trench1-4.avif",
        ],
      },
      {
        name: "Casual Summer Blouse",
        slug: "casual-summer-blouse",
        description: "Lightweight blouse made with soft cotton for summer days.",
        price: 200,
        sizes: ["S", "M", "L"],
        colors: ["white", "pink"],
        stock: { S: 8, M: 10, L: 7 },
        tags: ["women", "top", "summer"],
        category: categories[1]._id,
        images: [
          "/uploads/blouse1-1.avif",
          "/uploads/blouse1-2.avif",
          "/uploads/blouse1-3.avif",
          "/uploads/blouse1-4.avif",
        ],
      },
      {
        name: "Women’s Blue Jeans",
        slug: "womens-blue-jeans",
        description: "Comfortable stretch denim jeans with a flattering fit.",
        price: 370,
        sizes: ["S", "M", "L"],
        colors: ["blue"],
        stock: { S: 10, M: 8, L: 5 },
        tags: ["women", "denim", "casual"],
        category: categories[1]._id,
        images: [
          "/uploads/wjeans1-1.avif",
          "/uploads/wjeans1-2.avif",
          "/uploads/wjeans1-3.avif",
          "/uploads/wjeans1-4.avif",
        ],
      },
      {
        name: "Floral Long Dress",
        slug: "floral-long-dress",
        description: "Beautiful floral printed dress made with soft fabric.",
        price: 480,
        sizes: ["S", "M", "L"],
        colors: ["multicolor"],
        stock: { S: 5, M: 6, L: 4 },
        tags: ["women", "floral", "fashion"],
        category: categories[1]._id,
        images: [
          "/uploads/flowerdress1-1.avif",
          "/uploads/flowerdress1-2.avif",
          "/uploads/flowerdress1-3.avif",
          "/uploads/flowerdress1-4.avif",
        ],
      },
    ];

    await Product.insertMany(products);
    console.log("🛍️ 10 Men/Women Products created successfully!");

    mongoose.connection.close();
    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
})();
