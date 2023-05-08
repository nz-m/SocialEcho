const router = require("express").Router();
const passport = require("passport");
const decodeToken = require("../middlewares/auth/decodeToken");

const {
  getNotMemberCommunities,
  getMemberCommunities,
  getCommunityMembers,
  getCommunityMods,
  getReportedPosts,
  removeReportedPost,
  joinCommunity,
  leaveCommunity,
  banUser,
  unbanUser,
  reportPost,
  getCommunity,
  getCommunities,
  createCommunity,
  addRulesToCommunity,
  addRules,
  addModToCommunity,
} = require("../controllers/community.controller");

router.use(passport.authenticate("jwt", { session: false }));

router.get("/notmember", decodeToken, getNotMemberCommunities);
router.get("/member", decodeToken, getMemberCommunities);
router.get("/:name/members", getCommunityMembers);
router.get("/:name/moderators", getCommunityMods);
router.get("/:name/reported-posts", getReportedPosts);
router.delete("/:name/reported-posts/:postId", removeReportedPost);
router.post("/:name/join", decodeToken, joinCommunity);
router.post("/:name/leave", decodeToken, leaveCommunity);
router.post("/:name/ban/:id", banUser);
router.post("/:name/unban/:id", unbanUser);
router.put("/:name/report", decodeToken, reportPost);
router.get("/:name", getCommunity);
router.get("/", getCommunities);
router.post("/", createCommunity);
router.post("/:name/add-all-rules", addRulesToCommunity);
router.post("/rules", addRules);
router.patch("/:name/add-moderators", addModToCommunity);

module.exports = router;
