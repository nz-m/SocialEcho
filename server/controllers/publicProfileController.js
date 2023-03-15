const User = require("../models/User");
const Relationship = require("../models/Relationship");
const Post = require("../models/Post");
const Community = require("../models/Community");
const getUserFromToken = require("../utils/getUserFromToken");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");

dayjs.extend(duration);

const getPublicUsers = async (req, res) => {
  try {
    // get the user ID from the authorization token
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // get up to 5 public users that the current user is not already following
    const usersToDisplay = await User.find(
      {
        _id: {
          $nin: [
            userId,
            ...(await Relationship.find({ follower: userId }).distinct(
              "following"
            )),
          ],
        },
        role: { $ne: "moderator" },
      },
      "_id name avatar location"
    ).limit(5);

    res.status(200).json(usersToDisplay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicUser = async (req, res) => {
  try {
    const currentUserId = getUserFromToken(req);
    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = req.params.id;

    const user = await User.findById(id).select(
      "-password -email -savedPosts -updatedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // get the number of posts the user has created and the list of communities the user is in
    const totalPosts = await Post.countDocuments({ user: user._id });
    const communities = await Community.find({ members: user._id })
      .select("name")
      .lean();

    // check if the current user is following the user
    const isFollowing = await Relationship.findOne({
      follower: currentUserId,
      following: user._id,
    });

    // check when current user followed the user
    const followingSince = isFollowing
      ? dayjs(isFollowing.createdAt).format("MMM D, YYYY")
      : null;

    // get the number of posts the user has created in the last 30 days
    const last30Days = dayjs().subtract(30, "day").toDate();
    const postsLast30Days = await Post.countDocuments({
      user: user._id,
      createdAt: { $gte: last30Days },
    });
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
      JoinedOn: dayjs(user.createdAt).format("MMM D, YYYY"),
      totalFollowers: user.followers?.length,
      totalFollowing: user.following?.length,
      isFollowing: isFollowing ? true : false,
      followingSince,
      postsLast30Days,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const followerId = getUserFromToken(req);
    if (!followerId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const followingId = req.params.id;

    // Check if the relationship already exists
    const existingRelationship = await Relationship.findOne({
      follower: followerId,
      following: followingId,
    });
    // Update the User model by adding the followerId to the followers array of the following user
    await User.findByIdAndUpdate(
      followingId,
      { $addToSet: { followers: followerId } },
      { new: true }
    );

    if (existingRelationship) {
      return res.status(400).json({
        message: "Relationship already exists",
      });
    }

    // Create a new relationship between the follower and following users
    await Relationship.create({ follower: followerId, following: followingId });

    // Update the User model by adding the followingId to the following array of the follower user
    await User.findByIdAndUpdate(
      followerId,
      { $addToSet: { following: followingId } },
      { new: true }
    );

    res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getPublicUsers,
  followUser,
  getPublicUser,
};
