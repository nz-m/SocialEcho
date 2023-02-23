const mongoose = require("mongoose");

const moderationRuleSchema = new mongoose.Schema({
  rule: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ModerationRule", moderationRuleSchema);
