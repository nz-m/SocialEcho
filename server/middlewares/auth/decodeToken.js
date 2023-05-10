const jwt = require("jsonwebtoken");

/**
 * Middleware function to decode a JWT token in the Authorization header.
 * If the token is valid, the decoded user ID is added to the request object.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 * @throws {Error} Throws an error if the token is invalid or missing.
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
