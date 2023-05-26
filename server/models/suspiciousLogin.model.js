const mongoose = require("mongoose");

const suspiciousLoginSchema = new mongoose.Schema(
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
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
    unverifiedAttempts: {
      type: Number,
      default: 0,
    },
    isTrusted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SuspiciousLogin", suspiciousLoginSchema);
