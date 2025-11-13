function adminAuth(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "not have admin access" });
  }
  next();
}

module.exports = adminAuth;
