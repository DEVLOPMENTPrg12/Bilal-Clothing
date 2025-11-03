const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// ADD category
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });
  await newCategory.save();
  res.json(newCategory);
});
// DELETE category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

module.exports = router;
