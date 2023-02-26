const Community = require("../models/community");
const ModerationRules = require("../models/ModerationRules");
const jwt = require("jsonwebtoken");
async function getCommunities(req, res) {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function getCommunity(req, res) {
  try {
    const community = await Community.findOne({
      name: req.params.name,
    }).populate("rules");
    // need to populate the moderators later

    res.status(200).json(community);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function createCommunity(req, res) {
  const communities = req.body;
  try {
    const savedCommunities = await Community.insertMany(communities);
    res.status(201).json(savedCommunities);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

async function addRules(req, res) {
  const rules = req.body;
  try {
    const savedRules = await ModerationRules.insertMany(rules);
    res.status(201).json(savedRules);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

async function addRulesToCommunity(req, res) {
  const { name } = req.params;
  const rules = await ModerationRules.find();

  try {
    const appliedRules = await Community.findOneAndUpdate(
      { name },
      { $push: { rules } },
      { new: true }
    );
    res.status(201).json(appliedRules);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

async function getMemberCommunities(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;
  try {
    const communities = await Community.find({
      members: { $in: [userId] },
    });

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: "Error getting communities", error });
  }
}

async function getNotMemberCommunities(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;
  try {
    const communities = await Community.find({
      members: { $nin: [userId] },
    });

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: "Error getting communities", error });
  }
}

async function joinCommunity(req, res) {
  const { name } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;
  try {
    const community = await Community.findOneAndUpdate(
      { name },
      { $push: { members: userId } },
      { new: true }
    );
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: "Error joining community", error });
  }
}

async function leaveCommunity(req, res) {
  const { name } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;
  try {
    const community = await Community.findOneAndUpdate(
      { name },
      { $pull: { members: userId } },
      { new: true }
    );
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: "Error leaving community", error });
  }
}

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
};
