const router = require("express").Router();
const {
  getPublicPosts,
  getPosts,
  getPost,
  createPost,
  confirmPost,
  rejectPost,
  deletePost,
  getCommunityPosts,
  getFollowingUsersPosts,
  likePost,
  unlikePost,
  addComment,
  savePost,
  unsavePost,
  getSavedPosts,
  clearPendingPosts,
} = require("../controllers/post.controller");
const fileUpload = require("../middlewares/post/fileUpload");
const passport = require("passport");
const decodeToken = require("../middlewares/auth/decodeToken");
const {
  postValidator,
  postValidatorHandler,
} = require("../middlewares/post/postValidator");
const processPerspectiveAPIResponse = require("../services/analyzeContent");
const processPost = require("../services/processPost");
const postConfirmation = require("../middlewares/post/postConfirmation");

const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.use(requireAuth, decodeToken);

router.get("/community/:communityId", getCommunityPosts);
router.get("/saved", getSavedPosts);
router.get("/:publicUserId/userPosts", getPublicPosts);
router.get("/:id/following", getFollowingUsersPosts);
router.get("/:id", getPost);
router.get("/", getPosts);

router.post("/confirm", confirmPost);
router.post("/reject", rejectPost);

router.post("/:id/comment", addComment);

router.post(
  "/",
  fileUpload,
  postValidator,
  postValidatorHandler,
  processPerspectiveAPIResponse,
  processPost,
  postConfirmation,
  createPost
);

router.delete("/pending", clearPendingPosts);
router.delete("/:id", deletePost);

router.patch("/:id/save", savePost);
router.patch("/:id/unsave", unsavePost);
router.patch("/:id/like", likePost);
router.patch("/:id/unlike", unlikePost);

module.exports = router;
