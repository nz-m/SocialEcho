const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const formatCreatedAt = require("../utils/timeConverter");

const Post = require("../models/post.model");
const Community = require("../models/community.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Relationship = require("../models/relationship.model");

const createPost = async (req, res) => {
  try {
    const userId = req.body.user;
    const isMember = await Community.findOne({
      _id: req.body.community,
      members: userId,
    });

    if (!isMember) {
      return res.status(401).json({
        message: "Unauthorized to post in this community",
      });
    }

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

    const savedPost = await newPost.save();
    const id = savedPost._id;
    const post = await Post.findById(id)
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    post.createdAt = dayjs(post.createdAt).fromNow();

    res.json(post);
  } catch (error) {
    res.status(409).json({
      message: "Error creating post",
    });
  }
};

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id)
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.dateTime = formatCreatedAt(post.createdAt);

    post.createdAt = dayjs(post.createdAt).fromNow();

    post.savedByCount = await User.countDocuments({
      savedPosts: id,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({
      message: "Error getting post",
    });
  }
};

/**
 * Retrieves the posts for current user, including pagination, the number of posts saved by each user,
 * sorted by creation date.
 *
 * @async
 * @function getPosts
 *
 * @param {string} req.userId - The ID of the user making the request.
 * @param {string} [req.query.limit=10] - The maximum number of posts to retrieve.
 * Defaults to 10 if not provided.
 * @param {string} [req.query.skip=0] - The number of posts to skip before starting to retrieve them.
 * Defaults to 0 if not provided.
 */
const getPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const communities = await Community.find({
      members: req.userId,
    });
    const communityIds = communities.map((community) => community._id);

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
      .skip(skip)
      .limit(limit)
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    const totalPosts = await Post.countDocuments({
      community: {
        $in: communityIds,
      },
    });

    res.status(200).json({
      formattedPosts,
      totalPosts,
    });
  } catch (error) {
    res.status(404).json({
      message: "Posts not found",
    });
  }
};

/**
 * Retrieves the posts for a given community, including the post information, the number of posts saved by each user,
 * the user who created it, and the community it belongs to.
 *
 * @route GET /posts/community/:communityId
 *
 * @async
 * @function getCommunityPosts
 *
 * @param {Object} req.query - The query parameters for the request.
 * @param {string} req.params.id - The ID of the community to retrieve the posts for.
 * @param {string} [req.query.limit=10] - The maximum number of posts to retrieve. Defaults to 10 if not specified.
 * @param {string} [req.query.skip=0] - The number of posts to skip before starting to retrieve them.
 * Defaults to 0 if not specified.
 */
const getCommunityPosts = async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const isMember = await Community.findOne({
      _id: communityId,
      members: req.userId,
    });

    if (!isMember) {
      return res.status(401).json({
        message: "Unauthorized to view posts in this community",
      });
    }

    const posts = await Post.find({
      community: communityId,
    })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar")
      .populate("community", "name")
      .skip(skip)
      .limit(limit)
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    const totalCommunityPosts = await Post.countDocuments({
      community: communityId,
    });

    res.status(200).json({
      formattedPosts,
      totalCommunityPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * Retrieves the posts of the users that the current user is following in a given community
 *
 * @route GET /posts//:id/following
 *
 * @async
 * @function getFollowingUsersPosts
 *
 * @param {string} req.params.id - The ID of the community to retrieve the posts for.
 * @param {number} [req.query.limit=10] - The maximum number of posts to retrieve. Defaults to 10 if not specified.
 * @param {number} [req.query.skip=0] - The number of posts to skip before starting to retrieve them. Defaults to 0 if not specified.
 */
const getFollowingUsersPosts = async (req, res) => {
  try {
    const communityId = req.params.id;

    const following = await Relationship.find({
      follower: req.userId,
    });

    const followingIds = following.map(
      (relationship) => relationship.following
    );

    const posts = await Post.find({
      user: {
        $in: followingIds,
      },
      community: communityId,
    })
      .sort({
        createdAt: -1,
      })
      .populate("user", "name avatar")
      .populate("community", "name")
      .limit(20)
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    await post.remove();
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "Post not found. It may have been deleted already",
    });
  }
};

/**
 * @param {string} req.params.id - The ID of the post to be liked.
 */
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
        message: "Post not found. It may have been deleted already",
      });
    }
    const savedByCount = await User.countDocuments({
      savedPosts: updatedPost._id,
    });
    const formattedPost = {
      ...updatedPost.toObject(),
      createdAt: dayjs(updatedPost.createdAt).fromNow(),
      savedByCount,
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
        message: "Post not found. It may have been deleted already",
      });
    }
    const savedByCount = await User.countDocuments({
      savedPosts: updatedPost._id,
    });

    const formattedPost = {
      ...updatedPost.toObject(),
      createdAt: dayjs(updatedPost.createdAt).fromNow(),
      savedByCount,
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

/**
 * Saves or unsaves a post for a given user by updating the user's
 * savedPosts array in the database. Uses $addToSet or $pull operation based on the value of the operation parameter.
 *
 * @async
 * @function saveOrUnsavePost
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param {string} operation - The operation to perform, either "$addToSet" to save the post or "$pull" to unsave it.
 */
const saveOrUnsavePost = async (req, res, operation) => {
  try {
    /**
     * @type {string} id - The ID of the post to be saved or unsaved.
     */
    const id = req.params.id;

    const update = {};
    update[operation === "$addToSet" ? "$addToSet" : "$pull"] = {
      savedPosts: id,
    };
    const updatedUserPost = await User.findOneAndUpdate(
      {
        _id: req.userId,
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
  await saveOrUnsavePost(req, res, "$addToSet");
};

const unsavePost = async (req, res) => {
  await saveOrUnsavePost(req, res, "$pull");
};

/**
 * @route GET /posts/saved
 */
const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Send saved posts of communities user is a member of only
    const communityIds = await Community.find({ members: req.userId }).distinct(
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

/**
 * Retrieves up to 10 posts of the public user that are posted in the communities
 * that both the public user and the current user are members of.
 *
 * @route GET /posts/:publicUserId/userPosts
 *
 * @param req.userId - The id of the current user.
 * @async
 * @function getPublicPosts
 *
 * @param {string} req.params.publicUserId - The id of the public user whose posts to retrieve.
 */
const getPublicPosts = async (req, res) => {
  try {
    const publicUserId = req.params.publicUserId;
    const currentUserId = req.userId;

    const isFollowing = await Relationship.exists({
      follower: currentUserId,
      following: publicUserId,
    });
    if (!isFollowing) {
      return null;
    }

    const commonCommunityIds = await Community.find({
      members: { $all: [currentUserId, publicUserId] },
    }).distinct("_id");

    const publicPosts = await Post.find({
      community: { $in: commonCommunityIds },
      user: publicUserId,
    })
      .populate("user", "_id name avatar")
      .populate("community", "_id name")
      .sort("-createdAt")
      .limit(10)
      .exec();

    const formattedPosts = publicPosts.map((post) => ({
      ...post.toObject(),
      createdAt: dayjs(post.createdAt).fromNow(),
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  getCommunityPosts,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getComments,
  savePost,
  unsavePost,
  getSavedPosts,
  getPublicPosts,
  getFollowingUsersPosts,
};
