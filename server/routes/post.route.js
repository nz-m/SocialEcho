const router = require("express").Router();
const {
  getPublicPosts,
  getPosts,
  getPost,
  createPost,
  deletePost,
  getCommunityPosts,
  getFollowingUsersPosts,
  likePost,
  unlikePost,
  addComment,
  savePost,
  unsavePost,
  getSavedPosts,
} = require("../controllers/post.controller");
const fileUpload = require("../middlewares/post/fileUpload");
const passport = require("passport");
const decodeToken = require("../middlewares/auth/decodeToken");
const {
  postValidator,
  postValidatorHandler,
} = require("../middlewares/post/postValidator");
const { processPerspectiveAPIResponse } = require("../services/perspectiveApi");

const requireAuth = passport.authenticate("jwt", { session: false });

router.use(requireAuth, decodeToken);

router.get("/community/:communityId", getCommunityPosts);
router.get("/saved", getSavedPosts);
router.get("/:publicUserId/userPosts", getPublicPosts);
router.get("/:id/following", getFollowingUsersPosts);
router.get("/:id", getPost);
router.get("/", getPosts);

router.post("/:id/comment", addComment);
router.post(
  "/",
  fileUpload,
  postValidator,
  postValidatorHandler,
  processPerspectiveAPIResponse,
  createPost
);

router.delete("/:id", deletePost);

router.patch("/:id/save", savePost);
router.patch("/:id/unsave", unsavePost);
router.patch("/:id/like", likePost);
router.patch("/:id/unlike", unlikePost);

module.exports = router;
