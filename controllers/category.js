const Category = require("../models/category");
const Slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const getCategoryId = await Category.findById({ categoryId });

    if (!getCategoryId) {
      return res.json({ error: "Category not exsist" });
    }
    const Category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: Slugify(name),
      },
      {
        new: true,
      }
    );
    res.json(Category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
