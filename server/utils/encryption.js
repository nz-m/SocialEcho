const CryptoJS = require("crypto-js");

const key = process.env.CRYPTO_KEY;

const iv = CryptoJS.lib.WordArray.random(16);

const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
  }).toString();
  return encrypted;
};

const decryptData = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

module.exports = {
  encryptField: (value) => encryptData(value),
  decryptField: (value) => decryptData(value),
  decryptData,
};
