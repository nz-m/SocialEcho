const express = require("express");
const router = express.Router();
const useragent = require("express-useragent");

const { addContextData } = require("../controllers/authController");

const {
  verifyEmailValidation,
  verifyEmail,
} = require("../middlewares/users/verifyEmail");

const {
  verifyLoginValidation,
  verifyLogin,
  blockLogin,
} = require("../middlewares/users/verifyLogin");

router.use(useragent.express());
router.get("/verify", verifyEmailValidation, verifyEmail, addContextData);
router.get("/verify-login", verifyLoginValidation, verifyLogin);
router.get("/block-login", verifyLoginValidation, blockLogin);

module.exports = router;
