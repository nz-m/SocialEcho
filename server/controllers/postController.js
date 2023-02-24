const Post = require("../models/Post");

const createPost = async (req, res) => {
  let newPost;

  if (req.files && req.files.length > 0) {
    const { filename } = req.files[0];
    const fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/userFiles/${filename}`;
    newPost = new Post({
      user: req.body.user,
      community: req.body.community,
      body: req.body.body,
      fileUrl: fileUrl,
    });
  } else {
    newPost = new Post({
      user: req.body.user,
      community: req.body.community,
      body: req.body.body,
      fileUrl: null,
    });
  }

  try {
    await newPost.save();
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
};
