const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");
// add user

const addUserValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already in use");
        }
      } catch (err) {
        throw err;
      }
    }),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  check("role").default("general"),
];
//isStrongPassword() needs to be added later

const addUserValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded file
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      const filePath = path.join(
        __dirname,
        `../../assets/userAvatars/${filename}`
      );
      // delete file from server if validation fails
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
        console.log(`${filePath} was deleted`);
      });
    }

    res
      .status(400)
      .json({ errors: Object.values(mappedErrors).map((error) => error.msg) });
  }
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
