const express = require("express");
const router = express.Router();
const useragent = require("express-useragent");

const { addContextData } = require("../controllers/authController");

const {
  verifyEmailValidation,
  verifyEmail,
} = require("../middlewares/users/verifyEmail");

router.use(useragent.express());
router.get("/verify", verifyEmailValidation, verifyEmail, addContextData);

module.exports = router;
