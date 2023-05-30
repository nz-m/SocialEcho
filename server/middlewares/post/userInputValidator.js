const { body, validationResult } = require("express-validator");

const MAX_LENGTH = 3000;

const postValidator = [
  body("content")
    .isLength({ min: 10 })
    .withMessage("Your post is too short. Share more of your thoughts!")
    .isLength({ max: MAX_LENGTH })
    .withMessage("Post cannot exceed 3000 characters.")
    .trim(),
];

const commentValidator = [
  body("content")
    .isLength({ min: 1 })
    .withMessage("Your comment is too short. Share more of your thoughts!")
    .isLength({ max: MAX_LENGTH })
    .withMessage("Comment cannot exceed 3000 characters.")
    .trim(),
];

const validatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(" ");
    res.status(400).json({ message: errorMessages });
  }
};

module.exports = {
  postValidator,
  commentValidator,
  validatorHandler,
};
