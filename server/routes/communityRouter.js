const express = require("express");
const router = express.Router();
const passport = require("passport");

const communityController = require("../controllers/communityController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  communityController.getCommunities
);
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  communityController.getCommunity
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  communityController.createCommunity
);

module.exports = router;
