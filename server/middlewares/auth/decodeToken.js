const jwt = require("jsonwebtoken");

/**
 * Decodes a JWT token in the Authorization header.
 * If the token is valid, the decoded user ID is added to the request object.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 */
const decodeToken = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = decodeToken;
