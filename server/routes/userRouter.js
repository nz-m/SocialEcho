const express = require("express");
const router = express.Router();
const passport = require("passport");
const RefreshToken = require("../models/RefreshToken");
const jwt = require("jsonwebtoken");

// internal imports
const {
  getUsers,
  addUser,
  signin,
  logout,
  refreshToken,
} = require("../controllers/userController");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");
const authToken = require("../middlewares/users/auth");
const avatarUpload = require("../middlewares/users/avatarUpload");

//get all users
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);

// refresh token
router.post("/refresh-token", refreshToken);

//add user
router.post(
  "/signup",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);
router.post("/signin", signin);

// logout
router.post("/logout", logout);

module.exports = router;
