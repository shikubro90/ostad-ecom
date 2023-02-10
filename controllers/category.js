const Category = require("../models/category");
const slugify = require("slugify");


// create collection

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

// collection update

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    console.log(categoryId)
    const getCategoryId = await Category.findOne({_id: categoryId });

    if (!getCategoryId) {
      return res.json({ error: "Category not exists" });
    }
    const Category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
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



// get collections

exports.getCollections = async (req, res)=>{
  try{

  }catch(error){
    console.log(error)
  }
}
