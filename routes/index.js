var express = require("express");
var router = express.Router();
const authMiddleware = require("../middleware/auth");
const { Roles, roleCheck } = require("../middleware/verifyRole");
/* GET home page. */
router.get(
  "/profile",
  authMiddleware,
  roleCheck(Roles.admin),
  function (req, res) {
    res.status(200).json({ data: req.user });
  }
);

module.exports = router;
