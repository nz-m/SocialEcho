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

    // get up to 5 public users that the current user is not already following, sorted by number of followers
    const currentUser = await User.findById(userId);
    const usersToDisplay = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
          role: { $ne: "moderator" },
          following: { $nin: currentUser.following },
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
        $addFields: {
          numFollowers: { $size: "$followers" },
        },
      },
      {
        $sort: { numFollowers: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          avatar: 1,
          location: 1,
          numFollowers: 1,
        },
      },
    ]);

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

    // get the list of communities that the current user is in
    const currentUserCommunities = await Community.find({
      members: currentUserId,
    })
      .select("_id name")
      .lean();

    // get the list of communities that the user is in
    const userCommunities = await Community.find({ members: user._id })
      .select("_id name")
      .lean();

    // find the common communities
    const commonCommunities = currentUserCommunities.filter((comm) => {
      return userCommunities.some((userComm) => userComm._id.equals(comm._id));
    });

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
    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (relationshipExists) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    // Update the User model by adding the followerId to the followers array of the following user
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

    // Create a new relationship between the follower and following users
    await Relationship.create({ follower: followerId, following: followingId });

    res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const unfollowUser = async (req, res) => {
  try {
    const followerId = getUserFromToken(req);
    if (!followerId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const followingId = req.params.id;

    // Check if the relationship exists
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

    // Delete the relationship between the follower and following users
    await Relationship.deleteOne({
      follower: followerId,
      following: followingId,
    });

    res.status(200).json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFollowingUsers = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Query the Relationship model for all relationships where the current user is the follower
    const relationships = await Relationship.find({
      follower: userId,
    })
      .populate("following", "_id name avatar location")
      .lean();

    // Extract the users from the `following` property of each relationship object
    const followingUsers = relationships
      .map((relationship) => ({
        ...relationship.following,
        followingSince: relationship.createdAt,
      }))
      .sort((a, b) => b.followingSince - a.followingSince);

    res.status(200).json(followingUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
};
