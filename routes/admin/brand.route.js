const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { roleCheck, Roles } = require("../../middleware/verifyRole");
const { body, param } = require("express-validator");
const {
  addBrand,
  updateBrand,
  deleteBrand,
} = require("../../controllers/admin/brand.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  upload.single("brandImg"),
  [
    body("name", "Name Cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
  ],
  addBrand
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  upload.single("brandImg"),
  [
    body("name", "Name Cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
  ],
  updateBrand
);

router.delete(
  "/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  param("id", "Brand Id invalid").isMongoId(),
  deleteBrand
);

module.exports = router;
