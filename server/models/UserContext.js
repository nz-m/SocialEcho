const mongoose = require("mongoose");
const { encryptField, decryptField } = require("../utils/encryption");

const userContextSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

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
