const User = require("../models/User");
const Cart = require("../models/Cart");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");
const { verifyToken } = require("../utils/emailTemplate");
const { frontEndBaseUrl, jwtSecret } = require("../config/keys");
const jwt = require("jsonwebtoken");

const user = (req, res) => {
  console.log("This is a req to the /user route");
  res.send("Hello User");
};

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email Already in Use" }] });
    }
    const hash = await bcrypt.hash(password, saltRounds);
    // Create unique key
    const verificationtoken = crypto.randomBytes(32).toString("hex");
    const userToSave = new User({
      name,
      email,
      password: hash,
      verificationToken: verificationtoken,
      // Also store a date 1 week ahead of now
    });
    const user = await userToSave.save();
    await Cart.create({ user: user._id });
    // await sendEmail(
    //   email,
    //   "Verify User",
    //   verifyToken(name, `${frontEndBaseUrl}/verifyUser/${verificationtoken}`)
    // );
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ info: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.params;
    const checkUser = await User.findOne({ verificationToken: token });
    if (!checkUser) {
      return res.status(404).json({ errors: [{ msg: "Invalid Token" }] });
    }
    // Check if the current time is less than the token expiry
    checkUser.isVerified = true;
    checkUser.verificationToken = "";
    checkUser.verificationTokenExpiry = null;
    await checkUser.save();
    return res.status(200).json({ info: "User Verified , Please Login" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    if (user.isFlagged) {
      return res.status(400).json({
        errors: [
          {
            msg: "Admin has flagged this user from the app. Contact Admin for support",
          },
        ],
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "1d" }
    );
    user.lastLogin = new Date();
    await user.save();
    return res.status(200).json({ info: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};
module.exports = {
  user,
  registerUser,
  verifyEmail,
  loginUser,
};
