const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const { roleCheck, Roles } = require("../../middleware/verifyRole");
const { body, param } = require("express-validator");
const {
  addSeries,
  updateSeries,
  deleteSeries,
} = require("../../controllers/admin/series.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Note : Perform Server side validation for the brandId in req.body

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.admin),
  upload.single("seriesImg"),
  [
    body("name", "Name Cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
    body("brandId", "Invalid Brand Id").isMongoId(),
  ],
  addSeries
);

router.put(
  "/update/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  upload.single("seriesImg"),
  [
    body("name", "Name Cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
  ],
  updateSeries
);

router.delete(
  "/:id",
  authMiddleware,
  roleCheck(Roles.admin),
  param("id", "Series Id invalid").isMongoId(),
  deleteSeries
);

module.exports = router;
