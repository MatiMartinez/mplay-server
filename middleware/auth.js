const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Read token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  // Check token
  try {
    const encrypt = jwt.verify(token, process.env.SECRET);
    req.user = encrypt.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
