const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const {
  user,
  registerUser,
  verifyEmail,
  loginUser,
} = require("../controllers/users.controller");

/* GET users listing. */
router.get("/", user);

router.post(
  "/register",
  [
    body("name", "Name is Required").trim().notEmpty(),
    body("email", "Enter a valid email address")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Password must be 8 character long").isLength({ min: 8 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  registerUser
);

router.get(
  "/verifyEmail/:token",
  [param("token", "Enter a valid token").isHexadecimal()],
  verifyEmail
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email address")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Password must be 8 character long").isLength({ min: 8 }),
  ],
  loginUser
);

module.exports = router;
