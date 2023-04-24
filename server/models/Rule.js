const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  rule: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Rule", RuleSchema);
