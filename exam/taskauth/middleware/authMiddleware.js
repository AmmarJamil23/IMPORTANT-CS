const jwt = require("jsonwebtoken");

const JWT_SECRET = "exam-secret-key";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.send("Access denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.send("Invalid token");
  }
}

module.exports = authenticate;
