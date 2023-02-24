const jwt = require("jsonwebtoken");

export const getUserFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;
  return userId;
};

