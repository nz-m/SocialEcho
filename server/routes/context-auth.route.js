const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const useragent = require("express-useragent");
const Token = require("../models/token.model");

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

const decodeToken = require("../middlewares/auth/decodeToken");

const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get(
  "/context-data/primary",
  requireAuth,
  decodeToken,
  getAuthContextData
);
router.get(
  "/context-data/trusted",
  requireAuth,
  decodeToken,
  getTrustedAuthContextData
);
router.get(
  "/context-data/blocked",
  requireAuth,
  decodeToken,
  getBlockedAuthContextData
);
router.get("/user-preferences", requireAuth, decodeToken, getUserPreferences);

router.delete("/context-data/:contextId", requireAuth, deleteContextAuthData);

router.patch(
  "/context-data/block/:contextId",
  requireAuth,
  blockContextAuthData
);
router.patch(
  "/context-data/unblock/:contextId",
  requireAuth,
  unblockContextAuthData
);

router.use(useragent.express());

router.get("/verify", verifyEmailValidation, verifyEmail, addContextData);
router.get("/verify-login", verifyLoginValidation, verifyLogin);
router.get("/block-login", verifyLoginValidation, blockLogin);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:3000"}/signin?error=google_auth_failed`,
    session: false,
  }),
  async (req, res) => {
    try {
      const payload = {
        id: req.user._id,
        email: req.user.email,
      };

      const accessToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "6h",
      });

      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
      });

      await Token.deleteMany({ user: req.user._id });
      await new Token({
        user: req.user._id,
        refreshToken,
        accessToken,
      }).save();

      const userPayload = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
      };

      const params = new URLSearchParams({
        accessToken,
        refreshToken,
        accessTokenUpdatedAt: new Date().toLocaleString(),
        user: JSON.stringify(userPayload),
      });

      return res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:3000"}/signin?${params.toString()}`
      );
    } catch (error) {
      return res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:3000"}/signin?error=google_auth_failed`
      );
    }
  }
);

module.exports = router;
