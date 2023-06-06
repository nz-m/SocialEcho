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
      const { userId, fileUrl, fileType } = req;

      const community = await Community.findOne({
        _id: { $eq: communityId },
        members: { $eq: userId },
      });

      if (!community) {
        if (fileUrl) {
          const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;
          const blobServiceClient = BlobServiceClient.fromConnectionString(
            AZURE_CONNECTION_STRING
          );
          const containerName = "userfiles";
          const containerClient =
            blobServiceClient.getContainerClient(containerName);
          const blobName = path.basename(fileUrl);
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          const deleteResponse = await blockBlobClient.delete();
          console.log(
            `Blob deleted from Azure Blob Storage: ${deleteResponse.requestId}`
          );
        }

        return res.status(401).json({
          message: "Unauthorized to post in this community",
        });
      }

      const newPendingPost = new PendingPost({
        user: userId,
        community: communityId,
        content,
        fileUrl: fileUrl ? fileUrl : null,
        fileType: fileType ? fileType : null,
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
