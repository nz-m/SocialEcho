const express = require("express");
const passport = require("passport");
const router = express.Router();
const useragent = require("express-useragent");
const decodeToken = require("../middlewares/auth/decodeToken");

const {
  addContextData,
  getAuthContextData,
  getTrustedAuthContextData,
  getUserPreferences,
  getBlockedAuthContextData,
  deleteContextAuthData,
  blockContextAuthData,
  unblockContextAuthData,
} = require("../controllers/auth.controller");

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

router.use("/context-data", requireAuth);

router.get("/context-data/primary", decodeToken, getAuthContextData);
router.get("/context-data/trusted", decodeToken, getTrustedAuthContextData);
router.get("/context-data/blocked", decodeToken, getBlockedAuthContextData);
router.patch("/context-data/block/:contextId", blockContextAuthData);
router.patch("/context-data/unblock/:contextId", unblockContextAuthData);
router.delete("/context-data/:contextId", deleteContextAuthData);

router.get("/user-preferences", requireAuth, decodeToken, getUserPreferences);

router.use(useragent.express());

router.get("/verify", verifyEmailValidation, verifyEmail, addContextData);
router.get("/verify-login", verifyLoginValidation, verifyLogin);
router.get("/block-login", verifyLoginValidation, blockLogin);

module.exports = router;
