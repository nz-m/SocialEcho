const getUserFromToken = require("../utils/getUserFromToken");
const Community = require("../models/community.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");

const search = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const searchQuery = req.query.q;

    const communities = await Community.find({ members: userId }).distinct(
      "_id"
    );

    const [users, posts, joinedCommunity, community] = await Promise.all([
      User.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: "textScore" } }
      )
        .select("_id name email avatar")
        .sort({ score: { $meta: "textScore" } })
        .lean(),
      Post.find({
        community: { $in: communities },
        $text: { $search: searchQuery },
      })
        .select("_id body")
        .populate("user", "name avatar")
        .populate("community", "name")
        .lean()
        .exec(),
      Community.findOne({
        $text: { $search: searchQuery },
        members: { $in: userId },
      }).select("_id name description banner members"),
      Community.findOne({
        $text: { $search: searchQuery },
        members: { $nin: userId },
      }).select("_id name description banner members"),
    ]);

    posts.forEach((post) => {
      post.body = post.body.substring(0, 25);
    });

    res.status(200).json({ posts, users, community, joinedCommunity });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = search;
