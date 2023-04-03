const mongoose = require("mongoose");
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

const encryptField = (value) => encryptData(value);

const decryptField = (value) => decryptData(value);

const userContextSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    country: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    city: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    latitude: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    longitude: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    timezone: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    browser: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    version: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    platform: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    os: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    device: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
    deviceType: {
      type: String,
      required: true,
      set: encryptField,
      get: decryptField,
    },
  },
  {
    timestamps: true,
  }
);

const UserContext = mongoose.model("UserContext", userContextSchema);

module.exports = UserContext;
