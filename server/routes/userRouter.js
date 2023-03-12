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
  getModProfile,
  getUser,
} = require("../controllers/userController");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");
const avatarUpload = require("../middlewares/users/avatarUpload");

const requireAuth = passport.authenticate("jwt", { session: false });

//get all users
router.get("/", requireAuth, getUsers);

//get user by id
router.get("/:id", requireAuth, getUser);

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

// get moderator profile

router.get("/moderator", requireAuth, getModProfile);

// logout
router.post("/logout", logout);

module.exports = router;
