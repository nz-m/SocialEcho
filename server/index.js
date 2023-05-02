require("dotenv").config();
const express = require("express");

const adminRoutes = require("./routes/admin.route");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const communityRoutes = require("./routes/community.route");
const contextAuthRoutes = require("./routes/context-auth.route");
const search = require("./controllers/search.controller");

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
const postController = require("./controllers/post.controller");

//routes
app.get("/check-connectivity", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.get("/search", search);

app.use("/auth", contextAuthRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/communities", communityRoutes);
app.use("/admin", adminRoutes);

// 404 error handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
