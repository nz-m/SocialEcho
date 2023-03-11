const jwt = require("jsonwebtoken");

const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded.id;
  } catch (err) {
    return null;
  }
};

module.exports = getUserFromToken;
