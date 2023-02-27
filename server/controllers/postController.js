const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Post = require("../models/Post");
const Community = require("../models/Community");

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
  const userId = req.query.userId;

  try {
    // First, retrieve the list of communities where the user is a member
    const communities = await Community.find({ members: userId });
    const communityIds = communities.map((community) => community._id);

    // Next, retrieve the posts that belong to those communities
    const posts = await Post.find({ community: { $in: communityIds } })
      .sort({ createdAt: -1 })
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all posts from a community
const getComPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ community: id })
      .sort({ createdAt: -1 })
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// delete a post
// auth is done in the client side, need to add here as well
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, likes: { $ne: userId } },
      { $addToSet: { likes: userId } },
      { new: true }
    )
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Post not found or already liked" });
    }

    const formattedPost = {
      ...updatedPost,
      createdAt: dayjs(updatedPost.createdAt).fromNow(),
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const unlikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, likes: userId },
      { $pull: { likes: userId } },
      { new: true }
    )
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const formattedPost = {
      ...updatedPost,
      createdAt: dayjs(updatedPost.createdAt).fromNow(),
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPosts,
  createPost,
  getComPosts,
  deletePost,
  likePost,
  unlikePost,
};
