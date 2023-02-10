const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const router = express.Router();

const { createCategory, update, getCollections } = require("../controllers/category");

router.post("/create-category", requireSignIn, isAdmin, createCategory);
router.put("/update-category/:categoryId", requireSignIn, isAdmin, update);
router.get("/get-collections",requireSignIn, isAdmin, getCollections)

module.exports = router;
