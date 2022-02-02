const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
const User = require("../models/User");

let authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("x-sneaker");
    if (!token) {
      return res.status(403).json({ error: [{ msg: "Auth Token Invalid" }] });
    }
    let decoded = jwt.verify(token, jwtSecret);
    let user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ error: [{ msg: "Unauthorized" }] });
    }
    if (user.isFlagged) {
      return res.status(403).json({
        error: [
          { msg: "This user is banned from the platfrom . Contact Admin" },
        ],
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ errors: [{ msg: "Auth Token Invalid" }] });
  }
};

module.exports = authMiddleware;
