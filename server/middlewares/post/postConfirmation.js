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

    const message =
      "We apologize for the inconvenience, but our system couldn't determine the eligibility of your post for this community. While it may not meet the specific criteria, we acknowledge that it could still be relevant. You are welcome to proceed with posting it if you believe it is relevant to this community. However, please be aware that community moderators reserve the right to remove posts that do not align well with the community guidelines. Continuous violations may result in a ban from this community. Thank you for your understanding.";

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

    return res.status(400).json({ message, confirmationToken });
  } else {
    next();
  }
};

module.exports = postConfirmation;
