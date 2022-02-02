const crypto = require("crypto");
const { rzpWebHookSecret } = require("../config/keys");

const capturePayment = (req, res, next) => {
  try {
    let body = JSON.stringify(req.body);
    let expectedSignature = crypto
      .createHmac("sha256", rzpWebHookSecret)
      .update(body.toString())
      .digest("hex");
    console.log(req.headers);
    if (expectedSignature === req.headers["x-razorpay-signature"]) {
      next();
    } else {
      res.status(403).json({ error: [{ msg: "Unauthorized" }] });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = capturePayment;
