const mongoose = require("mongoose");
const {
  encryptField,
  decryptField,
  decryptData,
} = require("../utils/encryption");
const LogSchema = new mongoose.Schema({
  email: { type: String },

  context: { type: String, set: encryptField, get: decryptField },

  message: { type: String, required: true },

  type: { type: String, required: true },

  level: { type: String, required: true },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 604800, // 1 week
  },
});

LogSchema.methods.decryptContext = function () {
  return decryptData(this.context);
};

module.exports = mongoose.model("Log", LogSchema);
