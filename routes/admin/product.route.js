const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { roleCheck, Roles } = require("../../middleware/verifyRole");
const { body, param } = require("express-validator");

const {
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/product.controller");

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name Cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
    body("brandId", "Invalid Brand Id").isMongoId(),
    body("seriesId", "Invalid Series Id").isMongoId(),
  ],
  addProduct
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  [
    body("name", "Name Cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
    body("brandId", "Invalid Brand Id").isMongoId(),
    body("seriesId", "Invalid Series Id").isMongoId(),
    param("id", "Invalid Product Id").isMongoId(),
  ],
  updateProduct
);

// Complete the Delete Product

module.exports = router;
