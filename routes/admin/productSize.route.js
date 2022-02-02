const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { roleCheck, Roles } = require("../../middleware/verifyRole");
const { body } = require("express-validator");

const {
  addProductSize,
} = require("../../controllers/admin/productSize.controller");

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("size", "Size is required").isNumeric(),
    body("quantity", "Quanity is required").isNumeric(),
    body("productStyleId", "Invalid Product Style Id").isMongoId(),
    body("productId", "Invalid Product Id").isMongoId(),
  ],
  addProductSize
);

module.exports = router;
