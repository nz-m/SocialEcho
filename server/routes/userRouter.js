const express = require("express");
const router = express.Router();
const passport = require("passport");

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
