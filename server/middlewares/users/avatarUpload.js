const fs = require("fs");
function avatarUpload(req, res, next) {
  const multer = require("multer");
  const path = require("path");
  const up_folder = path.join(__dirname, "../../assets/userAvatars");

  // Set storage engine
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Check if directory exists, create it if it doesn't
      if (!fs.existsSync(up_folder)) {
        fs.mkdirSync(up_folder, { recursive: true });
      }
      cb(null, up_folder);
    },
    filename: (req, file, cb) => {
      // Generate unique filename by appending current timestamp to original filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  // Initialize Multer
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

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: err.message,
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
