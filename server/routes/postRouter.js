const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const fileUpload = require("../middlewares/post/fileUpload");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireAuth, postController.getPosts);
router.post("/", requireAuth, fileUpload, postController.createPost);
router.get("/:id", requireAuth, postController.getComPosts);
router.delete("/:id", requireAuth, postController.deletePost);
router.patch("/:id/like", requireAuth, postController.likePost);
router.patch("/:id/unlike", requireAuth, postController.unlikePost);

module.exports = router;
