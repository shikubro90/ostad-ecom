const express = require("express")
const router = express.Router()
const formidable = require("express-formidable")

const { requireSignIn, isAdmin } = require('../middlewares/auth')

const {createProduct, list} = require("../controllers/products")

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProduct)
router.get("/products", list);

module.exports = router;