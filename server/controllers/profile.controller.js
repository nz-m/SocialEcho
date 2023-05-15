const User = require("../models/user.model");
const Relationship = require("../models/relationship.model");
const Post = require("../models/post.model");
const Community = require("../models/community.model");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
const mongoose = require("mongoose");

dayjs.extend(duration);

/**
 * Retrieves up to 5 public users that the current user is not already following,
 * including their name, avatar, location, and follower count, sorted by the number of followers.
 *
 * @route GET /users/public-users
 */
const getPublicUsers = async (req, res) => {
  try {
    const userId = req.userId;

    const followingIds = await Relationship.find({ follower: userId }).distinct(
      "following"
    );

    const userIdObj = mongoose.Types.ObjectId(userId);

    const excludedIds = [...followingIds, userIdObj];

    const usersToDisplay = await User.aggregate([
      {
        $match: {
          _id: { $nin: excludedIds },
          role: { $ne: "moderator" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          avatar: 1,
          location: 1,
        },
      },
      {
        $lookup: {
          from: "relationships",
          localField: "_id",
          foreignField: "following",
          as: "followers",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          avatar: 1,
          location: 1,
          followerCount: { $size: "$followers" },
        },
      },
      {
        $sort: { followerCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json(usersToDisplay);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

/**
 * @route GET /users/public-users/:id
 *
 * @async
 * @function getPublicUser
 *
 * @param {string} req.params.id - The id of the user to retrieve
 * @param {string} req.userId - The id of the current user
 *
 * @description Retrieves public user information, including name, avatar, location, bio, role, interests,
 * total number of posts, list of communities the user is in, number of followers and followings,
 * whether the current user is following the user, the date the current user started following the user,
 * the number of posts the user has created in the last 30 days, and common communities between the current user and the user.
 */
const getPublicUser = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const id = req.params.id;

    const user = await User.findById(id).select(
      "-password -email -savedPosts -updatedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const totalPosts = await Post.countDocuments({ user: user._id });
    const communities = await Community.find({ members: user._id })
      .select("name")
      .lean();

    const currentUserCommunities = await Community.find({
      members: currentUserId,
    })
      .select("_id name")
      .lean();

    const userCommunities = await Community.find({ members: user._id })
      .select("_id name")
      .lean();

    const commonCommunities = currentUserCommunities.filter((comm) => {
      return userCommunities.some((userComm) => userComm._id.equals(comm._id));
    });

    const isFollowing = await Relationship.findOne({
      follower: currentUserId,
      following: user._id,
    });

    const followingSince = isFollowing
      ? dayjs(isFollowing.createdAt).format("MMM D, YYYY")
      : null;

    const last30Days = dayjs().subtract(30, "day").toDate();
    const postsLast30Days = await Post.aggregate([
      { $match: { user: user._id, createdAt: { $gte: last30Days } } },
      { $count: "total" },
    ]);

    const totalPostsLast30Days =
      postsLast30Days.length > 0 ? postsLast30Days[0].total : 0;

    const responseData = {
      name: user.name,
      avatar: user.avatar,
      location: user.location,
      bio: user.bio,
      role: user.role,
      interests: user.interests,
      totalPosts,
      communities,
      totalCommunities: communities.length,
      joinedOn: dayjs(user.createdAt).format("MMM D, YYYY"),
      totalFollowers: user.followers?.length,
      totalFollowing: user.following?.length,
      isFollowing: !!isFollowing,
      followingSince,
      postsLast30Days: totalPostsLast30Days,
      commonCommunities,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while retrieving the user",
    });
  }
};

/**
 * @route PATCH /users/:id/follow
 * @param {string} req.userId - The ID of the current user.
 * @param {string} req.params.id - The ID of the user to follow.
 */
const followUser = async (req, res) => {
  try {
    const followerId = req.userId;
    const followingId = req.params.id;

    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (relationshipExists) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    await Promise.all([
      User.findByIdAndUpdate(
        followingId,
        { $addToSet: { followers: followerId } },
        { new: true }
      ),
      User.findByIdAndUpdate(
        followerId,
        { $addToSet: { following: followingId } },
        { new: true }
      ),
    ]);

    await Relationship.create({ follower: followerId, following: followingId });

    res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while following the user",
    });
  }
};

/**
 * @route PATCH /users/:id/unfollow
 * @param {string} req.userId - The ID of the current user.
 * @param {string} req.params.id - The ID of the user to unfollow.
 */
const unfollowUser = async (req, res) => {
  try {
    const followerId = req.userId;

    const followingId = req.params.id;

    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (!relationshipExists) {
      return res.status(400).json({
        message: "Relationship does not exist",
      });
    }
    await Promise.all([
      User.findByIdAndUpdate(
        followingId,
        { $pull: { followers: followerId } },
        { new: true }
      ),
      User.findByIdAndUpdate(
        followerId,
        { $pull: { following: followingId } },
        { new: true }
      ),
    ]);

    await Relationship.deleteOne({
      follower: followerId,
      following: followingId,
    });

    res.status(200).json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while unfollowing the user",
    });
  }
};

/**
 * Retrieves the users that the current user is following, including their name, avatar, location,
 * and the date when they were followed, sorted by the most recent follow date.
 *
 * @route GET /users/following
 *
 * @param {string} req.userId - The ID of the current user.
 */
const getFollowingUsers = async (req, res) => {
  try {
    const relationships = await Relationship.find({
      follower: req.userId,
    })
      .populate("following", "_id name avatar location")
      .lean();

    const followingUsers = relationships
      .map((relationship) => ({
        ...relationship.following,
        followingSince: relationship.createdAt,
      }))
      .sort((a, b) => b.followingSince - a.followingSince);

    res.status(200).json(followingUsers);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while retrieving the following users",
    });
  }
};

module.exports = {
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
};
