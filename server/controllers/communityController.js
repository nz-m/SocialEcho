const Community = require("../models/community");

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
    const community = await Community.findOne({ name: req.params.name });
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

module.exports = {
  getCommunities,
  getCommunity,
  createCommunity,
};
