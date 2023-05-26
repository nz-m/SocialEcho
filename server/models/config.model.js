const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  usePerspectiveAPI: {
    type: Boolean,
    required: true,
    default: false,
  },
  categoryFilteringServiceProvider: {
    type: String,
    enum: ["TextRazor", "InterfaceAPI", "ClassifierAPI", "disabled"],
    default: "disabled",
    required: true,
  },
  categoryFilteringRequestTimeout: {
    type: Number,
    min: 5000, // 5 seconds
    max: 500000, // 5 minutes
    default: 30000, // 30 seconds
    required: true,
  },
});

module.exports = mongoose.model("Config", configSchema);
