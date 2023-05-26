const crypto = require("crypto");

const generateConfirmationToken = (userId) => {
  const currentTime = Date.now().toString();
  const tokenData = `${currentTime}${userId}`;
  return crypto.createHash("sha256").update(tokenData).digest("hex");
};

module.exports = generateConfirmationToken;
