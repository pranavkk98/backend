const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { roleCheck, Roles } = require("../middleware/verifyRole");
const { body } = require("express-validator");
const { addItemToCart } = require("../controllers/cart.controller");

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("item", "Enter a valid Item").isMongoId(),
    body("quantity", "Enter a valid quantity").isNumeric(),
  ],
  addItemToCart
);

module.exports = router;
