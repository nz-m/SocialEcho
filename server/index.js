const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

mongoose.set("strictQuery", false);

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user routes
const userRouter = require("./routes/userRouter");
app.use("/users", userRouter);

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// 404 error handling
app.use(notFoundHandler);

//error handling
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server up and running on port ${process.env.PORT}!`)
);
