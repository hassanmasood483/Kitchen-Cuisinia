var express = require("express");
var router = express.Router();

const authMiddleWare = require("../MiddleWare/auth");

const {
  addToCart,
  removeFromCart,
  getUserCart,
} = require("../Controllers/cartController");

router.post("/add", authMiddleWare, addToCart);
router.post("/remove", authMiddleWare, removeFromCart);
router.post("/get", authMiddleWare, getUserCart);

module.exports = router;
