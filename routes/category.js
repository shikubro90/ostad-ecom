const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const router = express.Router();

<<<<<<< HEAD
const { createCategory, update, remove , list, read} = require("../controllers/category");

router.post("/create-category", requireSignIn, isAdmin, createCategory);
router.put("/update-category/:categoryId", requireSignIn, isAdmin, update);
router.delete("/remove/:categoryId",requireSignIn, isAdmin, remove)
router.get("/list",requireSignIn, isAdmin, list)
router.get("/category/:slug", read)
=======
const { createCategory, update, getCollections } = require("../controllers/category");

router.post("/create-category", requireSignIn, isAdmin, createCategory);
router.put("/update-category/:categoryId", requireSignIn, isAdmin, update);
router.get("/get-collections",requireSignIn, isAdmin, getCollections)
>>>>>>> e0adad6e8efb7c45780d68ad20f4b1f8d907dacb

module.exports = router;
