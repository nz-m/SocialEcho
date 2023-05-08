const createError = require("http-errors");

const notFoundHandler = (req, res, next) => {
  next(createError(404, "Not found"));
};

const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development"
      ? err
      : {
          message: err.message,
        };

  res.status(err.status || 500);
  res.json(res.locals.error);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
