/**
 * Check if a token is valid based on its expiration time.
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
const isValidToken = (token) => {
  if (!token) {
    return false;
  }

  const payload = token.split(".")[1];
  if (!payload) {
    return false;
  }

  const decodedPayload = JSON.parse(window.atob(payload));

  const expiryTime = decodedPayload.exp * 1000;
  const currentTime = Date.now();
  return expiryTime > currentTime;
};

export { isValidToken };
