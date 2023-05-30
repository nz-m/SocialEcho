const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
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
      min: 5000,
      max: 500000,
      default: 30000,
      required: true,
    },
  },
  { validateBeforeSave: true }
);

module.exports = mongoose.model("Config", configSchema);
