const generateConfirmationToken = require("../../utils/confirmationToken");
const Community = require("../../models/community.model");
const PendingPost = require("../../models/pendingPost.model");
const fs = require("fs");
/**
 * @route POST /posts/
 * @param next - createPost (/controllers/post.controller.js)
 */
const postConfirmation = async (req, res, next) => {
  if (req.failedDetection) {
    const confirmationToken = generateConfirmationToken(req.userId);

    try {
      const { content, communityId } = req.body;
      const { userId, files } = req;

      const community = await Community.findOne({
        _id: { $eq: communityId },
        members: { $eq: userId },
      });

      if (!community) {
        if (files && files.length > 0) {
          const file = files[0];
          const filePath = `./assets/userFiles/${file.filename}`;
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }

        return res.status(401).json({
          message: "Unauthorized to post in this community",
        });
      }

      const file = files && files.length > 0 ? files[0] : null;

      const fileUrl = file
        ? `${req.protocol}://${req.get("host")}/assets/userFiles/${
            file.filename
          }`
        : null;

      const newPendingPost = new PendingPost({
        user: userId,
        community: communityId,
        content,
        fileUrl,
        confirmationToken,
        status: "pending",
      });

      await newPendingPost.save();
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const type = "failedDetection";

    return res.status(403).json({ type, confirmationToken });
  } else {
    next();
  }
};

module.exports = postConfirmation;
