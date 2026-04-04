const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }
  const isTokenBlacklisted = await redis.get(token);
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Unauthorized: Token is blackListed",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
    });
  }
};
module.exports = { authMiddleware };
