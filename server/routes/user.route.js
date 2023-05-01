const express = require("express");
const router = express.Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

const {
  getUsers,
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
} = require("../controllers/user.controller");

const {
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
} = require("../controllers/profile.controller");

const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");

const { sendVerificationEmail } = require("../middlewares/users/verifyEmail");
const {
  sendLoginVerificationEmail,
} = require("../middlewares/users/verifyLogin");

const avatarUpload = require("../middlewares/users/avatarUpload");

const requireAuth = passport.authenticate("jwt", { session: false });

router.patch("/:id/follow", requireAuth, followUser);
router.patch("/:id/unfollow", requireAuth, unfollowUser);
router.get("/public-users/:id", requireAuth, getPublicUser);
router.get("/public-users", requireAuth, getPublicUsers);
router.get("/moderator", requireAuth, getModProfile);
router.get("/following", requireAuth, getFollowingUsers);
router.put("/:id", requireAuth, updateInfo);
router.get("/:id", requireAuth, getUser);
router.get("/", requireAuth, getUsers);
router.post(
  "/signup",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser,
  sendVerificationEmail
);

router.post("/refresh-token", refreshToken);
router.post(
  "/signin",
  requestIp.mw(),
  useragent.express(),
  signin,
  sendLoginVerificationEmail
);
router.post("/logout", logout);

module.exports = router;
