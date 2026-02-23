const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(404).json({ message: "Invaid Token" });
  }

  req.user = decoded;
  next();
};

module.exports = verifyUser;
