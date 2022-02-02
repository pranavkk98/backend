const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { roleCheck, Roles } = require("../middleware/verifyRole");
const { body, param } = require("express-validator");
const {
  generateOrder,
  paymentOrder,
  captureOrder,
} = require("../controllers/order.controller");
const capturePaymentMiddleware = require("../middleware/capturePayment");

router.post(
  "/generate",
  authMiddleware,
  roleCheck(Roles.user),
  [
    body("deliverySpeedId", "Enter Valid Delivery Speed ID").isMongoId(),
    body("addressId", "Enter a valid Address Id").isMongoId(),
  ],
  generateOrder
);

router.get(
  "/payment/:id",
  authMiddleware,
  roleCheck(Roles.user),
  param("id").isMongoId(),
  paymentOrder
);

router.post("/capture", capturePaymentMiddleware, captureOrder);

module.exports = router;
