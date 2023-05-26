const Community = require("../models/community.model");
const Rule = require("../models/rule.model");
const User = require("../models/user.model");
const Report = require("../models/report.model");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    res.status(404).json({
      message: "No communities found",
    });
  }
};

const getCommunity = async (req, res) => {
  try {
    const community = await Community.findOne({
      name: req.params.name,
    })
      .populate("rules")
      .lean();
    res.status(200).json(community);
  } catch (error) {
    res.status(404).json({
      message: "Community not found",
    });
  }
};

const createCommunity = async (req, res) => {
  try {
    const communities = req.body;
    const savedCommunities = await Community.insertMany(communities);
    res.status(201).json(savedCommunities);
  } catch (error) {
    res.status(409).json({
      message: "Error creating community",
    });
  }
};

const addRules = async (req, res) => {
  const rules = req.body;
  try {
    const savedRules = await Rule.insertMany(rules);
    res.status(201).json(savedRules);
  } catch (error) {
    res.status(409).json({
      message: "Error creating rules",
    });
  }
};

const addRulesToCommunity = async (req, res) => {
  try {
    const { name } = req.params;
    const rules = await Rule.find();

    const appliedRules = await Community.findOneAndUpdate(
      {
        name,
      },
      {
        $push: {
          rules,
        },
      },
      {
        new: true,
      }
    );
    res.status(201).json(appliedRules);
  } catch (error) {
    res.status(409).json({
      message: "Error adding rules to community",
    });
  }
};

/**
 * Retrieves all communities that a user is a member of, including the community's ID,
 * name, banner image, member count, and description.
 *
 * @route GET /communities/member
 */
const getMemberCommunities = async (req, res) => {
  try {
    const communities = await Community.find({
      members: {
        $in: [req.userId],
      },
    })
      .select("_id name banner members description")
      .lean();

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({
      message: "Error getting communities",
    });
  }
};

/**
 * Retrieves up to 10 public communities that the current user is not a member of
 * and has not been banned from, including their name, banner image, description,
 * and member count, sorted by the number of members.
 *
 * @route GET /communities/not-member
 */
const getNotMemberCommunities = async (req, res) => {
  try {
    const communities = await Community.find({
      members: {
        $nin: [req.userId],
      },
      bannedUsers: {
        $nin: [req.userId],
      },
    })
      .select("_id name banner description members")
      .lean();

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({
      message: "Error getting communities",
    });
  }
};

/**
 * @route POST /communities/:name/join
 */
const joinCommunity = async (req, res) => {
  try {
    const { name } = req.params;

    const community = await Community.findOneAndUpdate(
      {
        name,
      },
      {
        $push: {
          members: req.userId,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({
      message: "Error joining community",
    });
  }
};

/**
 * @route POST /communities/:name/leave
 */
const leaveCommunity = async (req, res) => {
  try {
    const { name } = req.params;
    const community = await Community.findOneAndUpdate(
      {
        name,
      },
      {
        $pull: {
          members: req.userId,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({
      message: "Error leaving community",
    });
  }
};

/**
 * @route POST /communities/:name/ban/:id
 * @param {string} req.params.id - The ID of the user to ban.
 * @param {string} req.params.name - The name of the community to ban the user from.
 */
const banUser = async (req, res) => {
  try {
    const { id, name } = req.params;

    const community = await Community.findOneAndUpdate(
      {
        name,
      },
      {
        $pull: {
          members: id,
        },
        $push: {
          bannedUsers: id,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({
      message: "Error banning user from community",
    });
  }
};

/**
 * @route POST /communities/:name/unban/:id
 * @param {string} req.params.id - The ID of the user to unban.
 * @param {string} req.params.name - The name of the community to unban the user from.
 */
const unbanUser = async (req, res) => {
  try {
    const { id, name } = req.params;

    const community = await Community.findOneAndUpdate(
      {
        name,
      },
      {
        $pull: {
          bannedUsers: id,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({
      message: "Error unbanning user from community",
    });
  }
};

/**
 * Adds a user to a community as a moderator and member.
 *
 * @async
 * @function addModToCommunity
 *
 * @param {string} req.body.userId - The ID of the user to add as a moderator.
 * @param {string} req.params.name - The name of the community to add the user to.
 */
const addModToCommunity = async (req, res) => {
  try {
    const userId = req.body.userId;
    const communityName = req.params.name;
    const currentUser = await User.findById(userId);


    if (currentUser.role !== "moderator") {
      return res.status(401).json({
        message: "Only moderators can be added.",
      });
    }

    await Community.findOneAndUpdate(
      {
        name: communityName,
      },
      {
        $addToSet: {
          moderators: userId,
          members: userId,
        },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json(`User was added as a moderator and member of ${communityName}`);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/**
 * If a particular post has not been reported by anyone, create a new report. Otherwise, add the user to the list of users who have reported the post.
 * A post can be reported by multiple users but only once by each user.
 *
 * @route POST /communities/:name/report
 */
const reportPost = async (req, res) => {
  try {
    const { postId, reportReason, communityId } = req.body.info;

    if (!postId || !reportReason) {
      return res.status(400).json({
        message: "Invalid data. postId and reportReason are required.",
      });
    }

    const reportedPost = await Report.findOne({
      post: {$eq: postId},
    });

    if (reportedPost) {
      if (reportedPost.reportedBy.includes(req.userId)) {
        return res.status(400).json({
          message: "You have already reported this post.",
        });
      }

      reportedPost.reportedBy.push(req.userId);
      await reportedPost.save();

      return res.status(200).json(reportedPost);
    }

    const report = {
      post: postId,
      community: communityId,
      reportedBy: [req.userId],
      reportReason,
      reportDate: new Date(),
    };

    await Report.create(report);

    res.status(200).json({ message: "Post reported successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error reporting post",
    });
  }
};

/**
 * Retrieves the reported posts for a given community,
 * including the post information and the user who reported it.
 *
 * @route GET /communities/:name/reported-posts
 *
 * @param {Object} req.params.name - The name of the community to retrieve the reported posts for.
 */
const getReportedPosts = async (req, res) => {
  try {
    const communityName = req.params.name;
    const community = await Community.findOne({
      name: communityName,
    })
      .select("_id")
      .lean();

    const communityId = community._id;
    if (!community) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    const reportedPosts = await Report.find({ community: communityId })
      .populate({
        path: "post",
        model: "Post",
        select: ["_id", "body", "fileUrl", "createdAt", "user"],
        populate: {
          path: "user",
          model: "User",
          select: ["name", "avatar"],
        },
      })
      .populate({
        path: "reportedBy",
        model: "User",
        select: ["name", "avatar"],
      })
      .sort({ reportDate: -1 })
      .lean();

    if (!reportedPosts) {
      return res.status(404).json({
        message: "Reported post not found",
      });
    }
    reportedPosts.forEach((post) => {
      post.reportDate = dayjs(post.reportDate).fromNow();
    });

    return res.status(200).json({
      reportedPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the reported posts",
    });
  }
};

/**
 * @route DELETE /communities/reported-posts/:postId
 */
const removeReportedPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    await Report.findOneAndDelete({
      post: postId,
    });

    res.status(200).json({
      message: "Reported post removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/**
 * @route GET /communities/:name/members
 */
const getCommunityMembers = async (req, res) => {
  try {
    const communityName = req.params.name;
    const community = await Community.findOne({
      name: communityName,
    })
      .populate({
        path: "members",
        model: "User",
        select: ["name", "avatar", "createdAt", "_id", "location"],
        match: { role: { $ne: "moderator" } },
      })
      .populate({
        path: "bannedUsers",
        model: "User",
        select: ["name", "avatar", "createdAt", "_id", "location"],
      })
      .lean();

    if (!community) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    const members = community.members;
    const bannedUsers = community.bannedUsers;

    return res.status(200).json({ members, bannedUsers });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * @route GET /communities/:name/moderators
 */
const getCommunityMods = async (req, res) => {
  try {
    const communityName = req.params.name;
    const community = await Community.findOne({
      name: communityName,
    })
      .populate({
        path: "moderators",
        model: "User",
        select: ["name", "avatar", "createdAt", "_id", "location"],
        match: { role: "moderator" },
      })
      .lean();

    if (!community) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    const moderators = community.moderators;

    return res.status(200).json(moderators);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getCommunities,
  getCommunity,
  createCommunity,
  addRulesToCommunity,
  addRules,
  getNotMemberCommunities,
  getMemberCommunities,
  joinCommunity,
  leaveCommunity,
  addModToCommunity,
  reportPost,
  getReportedPosts,
  removeReportedPost,
  getCommunityMembers,
  getCommunityMods,
  banUser,
  unbanUser,
};
