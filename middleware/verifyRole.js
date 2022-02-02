const Roles = {
  admin: "APP_ADMIN",
  user: "APP_USER",
};

const roleCheck = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: [{ msg: "Unauthorized" }] });
  }
  next();
};

module.exports = {
  Roles,
  roleCheck,
};
