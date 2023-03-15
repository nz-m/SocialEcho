const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getUsers,
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
} = require("../controllers/userController");

const {
  getPublicUsers,
  followUser,
  getPublicUser,
} = require("../controllers/publicProfileController");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");
const avatarUpload = require("../middlewares/users/avatarUpload");

const requireAuth = passport.authenticate("jwt", { session: false });

router.patch("/:id/follow", requireAuth, followUser);
router.get("/public-users/:id", requireAuth, getPublicUser);
router.get("/public-users", requireAuth, getPublicUsers);
router.get("/moderator", requireAuth, getModProfile);
router.get("/", requireAuth, getUsers);
router.put("/:id", requireAuth, updateInfo);
router.get("/:id", requireAuth, getUser);
router.post("/refresh-token", refreshToken);
router.post(
  "/signup",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);
router.post("/signin", signin);
router.post("/logout", logout);

module.exports = router;
