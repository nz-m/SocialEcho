const express = require("express");
const router = express.Router();
const passport = require("passport");

// MAINTAIN THE ORDER OF THE ROUTES BY SPECIFICITY
const communityController = require("../controllers/communityController");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get(
  "/notmember",
  requireAuth,
  communityController.getNotMemberCommunities
);

router.get("/member", requireAuth, communityController.getMemberCommunities);

// Join a community
router.post("/:name/join", requireAuth, communityController.joinCommunity);

// Leave a community
router.post("/:name/leave", requireAuth, communityController.leaveCommunity);

router.get("/:name", requireAuth, communityController.getCommunity);
router.get("/", requireAuth, communityController.getCommunities);
router.post("/", requireAuth, communityController.createCommunity);

// add all rules to a community
router.post("/:name/add-all-rules", communityController.addRulesToCommunity);

// add rules to the database
router.post("/rules", communityController.addRules);

// add moderators to a community
router.patch("/:name/add-moderators", communityController.addModToCommunity);

// add a rule single rule to database
// router.post("/rule", communityController.addRule);

module.exports = router;
