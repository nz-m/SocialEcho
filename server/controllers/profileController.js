const User = require("../models/User");
const Relationship = require("../models/Relationship");
const Post = require("../models/Post");
const Community = require("../models/Community");
const getUserFromToken = require("../utils/getUserFromToken");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");

dayjs.extend(duration);

/**
 * Retrieves up to 5 public users that the current user is not already following,
 * including their name, avatar, location, and follower count, sorted by the number of followers.
 * @name getPublicUsers
 * @async
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 * @throws {Error} - If an error occurs while retrieving the users.
 */
const getPublicUsers = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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
    )
      .populate({
        path: "followers",
        select: "_id",
      })
      .lean()
      .exec();

    const userFollowerCounts = {};
    await Promise.all(
      usersToDisplay.map(async (user) => {
        userFollowerCounts[user._id] = user.followers.length;
      })
    );

    usersToDisplay.sort(
      (a, b) => userFollowerCounts[b._id] - userFollowerCounts[a._id]
    );

    usersToDisplay.forEach((user) => {
      user.followerCount = userFollowerCounts[user._id];
      delete user.followers;
    });

    usersToDisplay.splice(5);

    res.status(200).json(usersToDisplay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @async
 * @function getPublicUser
 * @description Retrieves public user information, including name, avatar, location, bio, role, interests,
   total number of posts, list of communities the user is in, number of followers and followings,
   whether the current user is following the user, the date the current user started following the user,
   the number of posts the user has created in the last 30 days, and common communities between the current user and the user.
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @throws {Error} - If an error occurs while retrieving the user.
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 */
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
      message: "Internal server error",
    });
  }
};

/**
 * Retrieves the users that the current user is following, including their name, avatar, location,
 * and the date when they were followed, sorted by the most recent follow date.
 * @name getFollowingUsers
 * @async
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @returns {Promise<void>} - A Promise that resolves to the response JSON object.
 * @throws {Error} - If an error occurs while retrieving the users.
 */
const getFollowingUsers = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const relationships = await Relationship.find({
      follower: userId,
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
