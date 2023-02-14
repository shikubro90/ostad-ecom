const Category = require("../models/category");
const slugify = require("slugify");


// create collection

const category_sort = {
  replacement: "-", // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: false, // convert to lower case, defaults to `false`
  strict: false, // strip special characters except replacement, defaults to `false`
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
};

// create category
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

// update category

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// remove category

exports.remove = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const remove = await Category.findByIdAndDelete(categoryId);
    res.json(remove);
  } catch (err) {
    return res.json(err.message);
  }
};

// see all category

exports.list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    return res.json(error.message);
  }
};

// read category

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (error) {
    return res.json(error.message);
  }
};



// get collections

exports.getCollections = async (req, res)=>{
  try{

  }catch(error){
    console.log(error)
  }
}
