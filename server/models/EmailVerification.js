const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
    unique: true,
  },
  messageId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800,
  },
});

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
