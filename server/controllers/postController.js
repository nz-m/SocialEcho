const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const getUserFromToken = require("../utils/getUserFromToken");

const Post = require("../models/Post");
const Community = require("../models/Community");
const Comment = require("../models/Comment");
const User = require("../models/User");

// TODO: Add paginations

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
    return res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    return res.status(409).json({
      message: error.message,
    });
  }
};

// get all posts
const getPosts = async (req, res) => {
  try {
    const userId = req.query.userId;
    // First, retrieve the list of communities where the user is a member
    const communities = await Community.find({
      members: userId,
    });
    const communityIds = communities.map((community) => community._id);

    // Next, retrieve the posts that belong to those communities
    const posts = await Post.find({
      community: {
        $in: communityIds,
      },
    })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// get all posts from a community
const getComPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Post.find({
      community: id,
    })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete a post
// auth is done in the client side, need to add here as well
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");
    // this will also trigger the pre-remove hook to delete comments
    await post.remove();
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const likePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: id,
        likes: {
          $ne: userId,
        },
      },
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("user", "name avatar")
      .populate("community", "name");

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found or already liked",
      });
    }

    const formattedPost = {
      ...updatedPost.toObject(),
      createdAt: dayjs(updatedPost.createdAt).fromNow(),
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const unlikePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: id,
        likes: userId,
      },
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("user", "name avatar")
      .populate("community", "name");

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const formattedPost = {
      ...updatedPost.toObject(),
      createdAt: dayjs(updatedPost.createdAt).fromNow(),
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { body, user, post } = req.body.newComment;
    const newComment = new Comment({
      body,
      user,
      post,
    });
    await newComment.save();
    await Post.findOneAndUpdate(
      {
        _id: post,
      },
      {
        $addToSet: {
          comments: newComment._id,
        },
      }
    );
    res.status(200).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getComments = async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comment.find({
      post: id,
    })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar")
      .lean();

    const formattedComments = comments.map((comment) => ({
      ...comment,
      createdAt: dayjs(comment.createdAt).fromNow(),
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const saveOrUnsavePost = async (req, res, operation) => {
  try {
    const id = req.params.id;
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const update = {};
    update[operation === "$addToSet" ? "$addToSet" : "$pull"] = {
      savedPosts: id,
    };
    const updatedUserPost = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      update,
      {
        new: true,
      }
    )
      .select("savedPosts")
      .populate({
        path: "savedPosts",
        populate: {
          path: "community",
          select: "name",
        },
      });

    if (!updatedUserPost) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const formattedPosts = updatedUserPost.savedPosts.map((post) => ({
      ...post.toObject(),
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const savePost = async (req, res) => {
  saveOrUnsavePost(req, res, "$addToSet");
};

const unsavePost = async (req, res) => {
  saveOrUnsavePost(req, res, "$pull");
};

const getSavedPosts = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Send saved posts of communities user is a member of only
    const communityIds = await Community.find({ members: userId }).distinct(
      "_id"
    );
    const savedPosts = await Post.find({
      community: { $in: communityIds },
      _id: { $in: user.savedPosts },
    })
      .populate("user", "name avatar")
      .populate("community", "name");

    const formattedPosts = savedPosts.map((post) => ({
      ...post.toObject(),
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  getComPosts,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getComments,
  savePost,
  unsavePost,
  getSavedPosts,
};
