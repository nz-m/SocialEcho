const { BlobServiceClient } = require("@azure/storage-blob");
const multer = require("multer");
const path = require("path");

async function fileUpload(req, res, next) {
  try {
    const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_CONNECTION_STRING
    );
    const containerName = "userfiles";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.startsWith("image/") ||
          file.mimetype.startsWith("video/")
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    });

    upload.any()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return next();
      }

      const file = req.files[0];

      const blobName = `${Date.now()}-${path.basename(file.originalname)}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadResponse = await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype,
        },
      });

      console.log(
        `File uploaded to Azure Blob Storage: ${uploadResponse.requestId}`
      );
      const fileUrl = blockBlobClient.url;

      req.fileUrl = fileUrl;
      req.fileType = file.mimetype.split("/")[0];

      return next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
}

module.exports = fileUpload;
