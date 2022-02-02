const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { roleCheck, Roles } = require("../../middleware/verifyRole");
const { body, param } = require("express-validator");

const {
  addProductStyle,
} = require("../../controllers/admin/productStyle.controller");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  upload.array("productStyleImg", 6),
  [
    body("color", "color is required").notEmpty(),
    body("price", "Price is required").isNumeric(),
    body("discountPrice", "discountPrice is required").isNumeric(),
    body("limitedEdition", " limitedEdition is required").notEmpty(),
    body("productId", "Invalid Product Id").isMongoId(),
  ],
  addProductStyle
);

module.exports = router;
