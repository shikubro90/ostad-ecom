const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const router = express.Router();

const { createCategory, update } = require("../controllers/category");

router.post("/create-categroy", requireSignIn, isAdmin, createCategory);
router.put("/update-category/:categoryId", requireSignIn, isAdmin, update);

module.exports = router;
