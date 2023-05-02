const mongoose = require("mongoose");

const moderationSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Moderation", moderationSchema);
