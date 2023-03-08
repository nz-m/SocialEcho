const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const fileUpload = require("../middlewares/post/fileUpload");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/saved", postController.getSavedPosts);
router.patch("/:id/save", postController.savePost);
router.patch("/:id/unsave", postController.unsavePost);
router.patch("/:id/like", requireAuth, postController.likePost);
router.patch("/:id/unlike", requireAuth, postController.unlikePost);
router.post("/:id/comment", requireAuth, postController.addComment);
router.get("/:id/comment", requireAuth, postController.getComments);
router.get("/", requireAuth, postController.getPosts);
router.post("/", requireAuth, fileUpload, postController.createPost);
router.get("/:id", requireAuth, postController.getComPosts);
router.delete("/:id", requireAuth, postController.deletePost);

module.exports = router;
