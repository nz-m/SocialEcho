const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]+$/.test(value);
        },
        message: function (props) {
          return `${props.value} is not a valid username!`;
        },
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return value.length >= 6;
        },
        message: function (props) {
          return "Password must be at least 6 characters long!";
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  const admin = this;
  if (!admin.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Admin", adminSchema);
