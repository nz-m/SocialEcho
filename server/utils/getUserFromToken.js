const jwt = require("jsonwebtoken");

/**
 * Gets the user ID from the JWT token in the Authorization header of the request.
 * @function getUserFromToken
 * @param {object} req - The request object.
 * @returns {string|null} - The user ID decoded from the JWT token, or null if the token is invalid or not present.
 */
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
