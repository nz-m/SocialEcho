const express = require("express");
const router = express.Router();
const passport = require("passport");

const communityController = require("../controllers/communityController");
const requireAuth = passport.authenticate("jwt", { session: false });

// Apply authentication middleware to all routes
router.use(requireAuth);

router.get("/notmember", communityController.getNotMemberCommunities);
router.get("/member", communityController.getMemberCommunities);
router.get("/:name/members", communityController.getCommunityMembers);
router.get("/:name/moderators", communityController.getCommunityMods);
router.get("/:name/reported-posts", communityController.getReportedPosts);
router.delete(
  "/:name/reported-posts/:postId",
  communityController.removeReportedPost
);
router.post("/:name/join", communityController.joinCommunity);
router.post("/:name/leave", communityController.leaveCommunity);
router.post("/:name/ban/:id", communityController.banUser);
router.post("/:name/unban/:id", communityController.unbanUser);
router.put("/:name/report", communityController.reportPost);
router.get("/:name", communityController.getCommunity);
router.get("/", communityController.getCommunities);
router.post("/", communityController.createCommunity);
router.post("/:name/add-all-rules", communityController.addRulesToCommunity);
router.post("/rules", communityController.addRules);
router.patch("/:name/add-moderators", communityController.addModToCommunity);
// router.post("/rule", communityController.addRule);

module.exports = router;
