const router = require("express").Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");
const decodeToken = require("../middlewares/auth/decodeToken");

const {
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

router.get("/public-users/:id", requireAuth, decodeToken, getPublicUser);
router.get("/public-users", requireAuth, decodeToken, getPublicUsers);
router.get("/moderator", requireAuth, decodeToken, getModProfile);
router.get("/following", requireAuth, decodeToken, getFollowingUsers);
router.get("/:id", requireAuth, getUser);

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

router.put("/:id", requireAuth, decodeToken, updateInfo);

router.patch("/:id/follow", requireAuth, decodeToken, followUser);
router.patch("/:id/unfollow", requireAuth, decodeToken, unfollowUser);

module.exports = router;
