const { BlobServiceClient } = require("@azure/storage-blob");
const multer = require("multer");
const path = require("path");

function avatarUpload(req, res, next) {
  const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_CONNECTION_STRING
  );
  const containerName = "profile";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: err.message,
      });
    } else {
      const blobName = `${Date.now()}-${path.basename(req.file.originalname)}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadResponse = await blockBlobClient.upload(
        req.file.buffer,
        req.file.buffer.length
      );
      console.log(
        `File uploaded to Azure Blob Storage: ${uploadResponse.requestId}`
      );
      const fileUrl = blockBlobClient.url;
      req.fileUrl = fileUrl;
      next();
    }
  });
}

module.exports = avatarUpload;
