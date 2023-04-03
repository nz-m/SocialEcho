const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const getUserFromToken = require("../utils/getUserFromToken");

const Post = require("../models/Post");
const Community = require("../models/Community");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Relationship = require("../models/Relationship");

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

    await newPost.save();
    return res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    return res.status(409).json({
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

    post.createdAt = dayjs(post.createdAt).fromNow();

    res.status(200).json(post);
  } catch (error) {
    return res.status(409).json({
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
 * @param {number} [req.query.limit=10] - The maximum number of posts to retrieve.
 * Defaults to 10 if not provided.
 * @param {number} [req.query.skip=0] - The number of posts to skip before starting to retrieve them.
 * Defaults to 0 if not provided.
 *
 * @throws {Error} - If an error occurs while retrieving the posts.
 *
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object containing the retrieved posts.
 */
const getPosts = async (req, res) => {
  try {
    const userId = getUserFromToken(req);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const communities = await Community.find({
      members: userId,
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

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const savedByCount = await User.countDocuments({
          savedPosts: post._id,
        });
        return {
          ...post,
          createdAt: dayjs(post.createdAt).fromNow(),
          savedByCount,
        };
      })
    );

    res.status(200).json(formattedPosts);
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
 * @async
 * @function getCommunityPosts
 *
 * @param {Object} req.query - The query parameters for the request.
 * @param {string} req.params.id - The ID of the community to retrieve the posts for.
 * @param {number} [req.query.limit=10] - The maximum number of posts to retrieve. Defaults to 10 if not specified.
 * @param {number} [req.query.skip=0] - The number of posts to skip before starting to retrieve them.
 * Defaults to 0 if not specified.
 *
 * @throws {Error} - If an error occurs while retrieving the posts.
 *
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 */
const getCommunityPosts = async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const userId = getUserFromToken(req);

    const isMember = await Community.findOne({
      _id: communityId,
      members: userId,
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
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const savedByCount = await User.countDocuments({
          savedPosts: post._id,
        });
        return {
          ...post,
          createdAt: dayjs(post.createdAt).fromNow(),
          savedByCount,
        };
      })
    );

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * Retrieves the posts of the users that the current user is following in a given community
 *
 * @async
 * @function getFollowingUsersPosts
 *
 * @param {string} req.params.id - The ID of the community to retrieve the posts for.
 * @param {number} [req.query.limit=10] - The maximum number of posts to retrieve. Defaults to 10 if not specified.
 * @param {number} [req.query.skip=0] - The number of posts to skip before starting to retrieve them.
 * Defaults to 0 if not specified.
 *
 * @throws {Error} - If an error occurs while retrieving the posts.
 *
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 */
const getFollowingUsersPosts = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    const communityId = req.params.id;

    const following = await Relationship.find({
      follower: userId,
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

/**
 * Deletes a post with the specified ID and its associated comments.
 *
 * @async
 * @function deletePost
 *
 * @param {string} req.params.id - The ID of the post to be deleted.
 *
 * @throws {Error} - If the specified post cannot be found or if there is an error while deleting it.
 *
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 */
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");
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
const likePost = async (req, res) => {
  try {
    /**
     * @type {string} id - The ID of the post to be liked.
     */
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
 * savedPosts array in the database. Uses $addToSet or $pull operation based on the value of the
 *
 * @async
 * @function saveOrUnsavePost
 *
 * @param {string} operation - The operation to perform, either "$addToSet" to save the post or "$pull" to unsave it.
 *
 * @throws {Error} - If an error occurs while saving or unsaving the post.
 *
 * @returns {Promise<void>} - A Promise that resolves to the response JSON
 * object containing the updated list of saved posts for the user.
 */
const saveOrUnsavePost = async (req, res, operation) => {
  try {
    /**
     * @type {string} id - The ID of the post to be saved or unsaved.
     */
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
  await saveOrUnsavePost(req, res, "$addToSet");
};

const unsavePost = async (req, res) => {
  await saveOrUnsavePost(req, res, "$pull");
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

/**
 * Retrieves up to 10 posts of the public user that are posted in the communities
 * that both the public user and the current user are members of.
 *
 * @async
 * @function getPublicPosts
 *
 * @param {string} req.params.publicUserId - The id of the public user whose posts to retrieve.
 *
 * @throws {Error} - If an error occurs while retrieving the posts.
 *
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 */
const getPublicPosts = async (req, res) => {
  try {
    const publicUserId = req.params.publicUserId;
    const currentUserId = getUserFromToken(req);
    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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

    res.status(200).json(publicPosts);
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
