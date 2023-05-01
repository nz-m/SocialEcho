require("dotenv").config();
const express = require("express");

const AdminRouter = require("./routes/AdminRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const communityRouter = require("./routes/communityRouter");
const contextAuthRouter = require("./routes/contextAuthRouter");

const app = express();

const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// use middlewares
app.use(cors());
app.use(morgan("dev"));
app.use("/assets/userFiles", express.static(__dirname + "/assets/userFiles"));
app.use(
  "/assets/userAvatars",
  express.static(__dirname + "/assets/userAvatars")
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport.js");

//routes
app.use("/check-connectivity", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});
app.use("/auth", contextAuthRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/communities", communityRouter);
app.use("/admin", AdminRouter);

// 404 error handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
