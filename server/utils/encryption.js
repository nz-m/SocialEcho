const CryptoJS = require("crypto-js");

const key = process.env.CRYPTO_KEY;

const iv = CryptoJS.lib.WordArray.random(16);

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, key, {
    iv: iv,
  }).toString();
};

const decryptData = (encryptedData) => {
  return CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptField: (value) => encryptData(value),
  decryptField: (value) => decryptData(value),
  encryptData,
  decryptData,
};
