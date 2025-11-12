const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorization = req.headers?.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "token not provided" });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "invalid token" });
  }
  next();
}

function adminAuthMiddleware(req, res, next) {}

module.exports = { authMiddleware };
