const express = require("express");
const router = express.Router();
const passport = require("passport");

// MAINTAIN THE ORDER OF THE ROUTES BY SPECIFICITY
const communityController = require("../controllers/communityController");

router.get(
  "/notmember",
  passport.authenticate("jwt", { session: false }),
  communityController.getNotMemberCommunities
);

router.get(
  "/member",
  passport.authenticate("jwt", { session: false }),
  communityController.getMemberCommunities
);

// Join a community
router.post(
  "/:name/join",
  passport.authenticate("jwt", { session: false }),
  communityController.joinCommunity
);

// Leave a community
router.post(
  "/:name/leave",
  passport.authenticate("jwt", { session: false }),
  communityController.leaveCommunity
);

router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  communityController.getCommunity
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  communityController.getCommunities
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  communityController.createCommunity
);

// add all rules to a community
router.post("/:name/add-all-rules", communityController.addRulesToCommunity);

// add rules to the database
router.post("/rules", communityController.addRules);

// add a rule single rule to database
// router.post("/rule", communityController.addRule);

module.exports = router;
