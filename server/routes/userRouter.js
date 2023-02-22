const express = require("express");
const router = express.Router();
const passport = require("passport");
const RefreshToken = require("../models/RefreshToken");
const jwt = require("jsonwebtoken");

// internal imports
const { getUsers, addUser, signin } = require("../controllers/userController");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");
const authToken = require("../middlewares/users/auth");
const avatarUpload = require("../middlewares/users/avatarUpload");

//get all users
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);

// refresh token
router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Check if refresh token is valid
    const existingToken = await RefreshToken.findOne({ refreshToken });
    if (!existingToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;

    console.log("refreshTokenExpiresAt", refreshTokenExpiresAt);
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return res.status(401).json({ message: "Expired refresh token" });
    }
    // Generate new access token
    const payload = { id: existingToken.userId };
    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    // Return new access token
    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//add user
router.post(
  "/signup",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);
router.post("/signin", signin);

module.exports = router;
