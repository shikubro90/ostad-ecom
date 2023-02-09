const express = require("express");
const router = express.Router();

const { register, loginUser, updateProfile } = require("../controllers/auth");
const { requireSignIn, isAdmin } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", loginUser);
router.get("/auth-check", requireSignIn, (req, res) => {
  res.json({ ok: true });
});
router.get("/adminCheck", requireSignIn, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.put("/profile", requireSignIn, updateProfile)

module.exports = router;
