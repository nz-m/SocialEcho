const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const fileUpload = require("../middlewares/post/fileUpload");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });

router.use(requireAuth);

router.get("/:publicUserId/userPosts", postController.getPublicPosts);
router.get("/saved", postController.getSavedPosts);
router.get("/:id/following", postController.getFollowingUsersPosts);
router.patch("/:id/save", postController.savePost);
router.patch("/:id/unsave", postController.unsavePost);
router.patch("/:id/like", postController.likePost);
router.patch("/:id/unlike", postController.unlikePost);
router.post("/:id/comment", postController.addComment);
router.get("/:id/comment", postController.getComments);
router.get("/:id", postController.getPost);
router.get("/", postController.getPosts);
router.post("/", fileUpload, postController.createPost);
router.delete("/:id", postController.deletePost);
router.get("/community/:communityId", postController.getCommunityPosts);

module.exports = router;
