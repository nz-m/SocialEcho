const express = require("express");
const passport = require("passport");
const router = express.Router();
const useragent = require("express-useragent");

const {
  addContextData,
  getAuthContextData,
  getTrustedAuthContextData,
  getUserPreferences,
} = require("../controllers/authController");

const {
  verifyEmailValidation,
  verifyEmail,
} = require("../middlewares/users/verifyEmail");

const {
  verifyLoginValidation,
  verifyLogin,
  blockLogin,
} = require("../middlewares/users/verifyLogin");

const requireAuth = passport.authenticate("jwt", { session: false });
// get user context data
router.get("/context-data/primary", requireAuth, getAuthContextData);
router.get("/context-data/trusted", requireAuth, getTrustedAuthContextData);

router.use(useragent.express());
router.get("/verify", verifyEmailValidation, verifyEmail, addContextData);
router.get("/verify-login", verifyLoginValidation, verifyLogin);
router.get("/block-login", verifyLoginValidation, blockLogin);
router.get("/user-preferences", requireAuth, getUserPreferences);

module.exports = router;
