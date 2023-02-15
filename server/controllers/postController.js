const Post = require("../models/Post");
// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create a post
const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json("Post created successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
};
