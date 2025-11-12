function adminAuth(req, res, next) {
  console.log(req.user);
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "not have admin access" });
  }
  next();
}

module.exports = adminAuth;
