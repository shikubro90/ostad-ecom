const Product = require("../models/products");
const slugify = require("slugify");
const fs = require("fs");
exports.createProduct = async (req, res) => {
  try {
    console.log(req.fields);
    console.log(req.files);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    console.log("PHOTO========>", photo);

    // validation
    switch (true) {
      case !name?.trim():
        return res.json({ error: "Name is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !price?.trim():
        return res.json({ error: "Price is required" });
      case !category?.trim():
        return res.json({ error: "Category is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping?.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// list

exports.list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    return res.json({ Message: error.message });
  }
};

// read

exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.json(product);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// photo

exports.photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
      return res.send(product.photo.data);
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// remove product

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("photo");
    return res.json(product);
  } catch (error) {
    return res.json({ Message: error.message });
  }
};

// update

exports.update = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name?.trim():
        return res.json({ error: "Name is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !price?.trim():
        return res.json({ error: "Price is required" });
      case !category?.trim():
        return res.json({ error: "Category is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping?.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    return res.json({ Message: error.message });
  }
};

// filter products

exports.filterProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let arg = {};
    if (checked.length > 0) arg.category = checked;
    if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(arg).select("-photo");
    console.log("Filtered products query=>", products.length);
    res.json(products);
  } catch (error) {
    return res.json({ Message: error.message });
  }
};

// count product

exports.countProdcuts = async (req, res) => {
  try {
    const products = await Product.find({}).estimatedDocumentCount();
    res.json(products);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// product list by tab
exports.productList = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const product = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.json(product);
  } catch (error) {
    return res.json({ Message: error.message });
  }
};

// search product
exports.searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const product = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    }).select("-photo");
    res.json(product)
  } catch (error) {
    return res.json({ Message: error.message });
  }
};
