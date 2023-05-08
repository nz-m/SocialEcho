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
  getComments,
  savePost,
  unsavePost,
  getSavedPosts,
} = require("../controllers/post.controller");
const fileUpload = require("../middlewares/post/fileUpload");
const passport = require("passport");
const decodeToken = require("../middlewares/auth/decodeToken");

const requireAuth = passport.authenticate("jwt", { session: false });

router.use(requireAuth);

router.get("/:publicUserId/userPosts", decodeToken, getPublicPosts);
router.get("/saved", decodeToken, getSavedPosts);
router.get("/:id/following", getFollowingUsersPosts);
router.patch("/:id/save", decodeToken, savePost);
router.patch("/:id/unsave", decodeToken, unsavePost);
router.patch("/:id/like", likePost);
router.patch("/:id/unlike", unlikePost);
router.post("/:id/comment", addComment);
router.get("/:id/comment", getComments);
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", fileUpload, createPost);
router.delete("/:id", deletePost);
router.get("/community/:communityId", decodeToken, getCommunityPosts);

module.exports = router;
