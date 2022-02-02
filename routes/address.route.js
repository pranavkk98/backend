const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { roleCheck, Roles } = require("../middleware/verifyRole");
const { body } = require("express-validator");
const { addAddress } = require("../controllers/address.controller");

router.post(
  "/add",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("addressLineOne", "Enter a valid Address Line One").notEmpty(),
    body("addressLineTwo", "Enter a valid Address Line One").notEmpty(),
    body("city", "Enter a valid City").notEmpty(),
    body("state", "Enter a valid State").notEmpty(),
    body("landmark", "Enter a valid Landmark").notEmpty(),
    body("pincode", "Enter a valid Pin or Zip Code").isNumeric(),
  ],
  addAddress
);

module.exports = router;
