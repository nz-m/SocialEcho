const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const fileUpload = require("../middlewares/post/fileUpload");

router.get("/", postController.getPosts);
router.post("/", fileUpload, postController.createPost);

module.exports = router;
