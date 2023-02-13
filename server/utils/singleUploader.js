function uploader(subfolder_path, allowedTypes, maxFileSize, errorMessage) {
  // upload folder
  const up_folder = `${__dirname}/../public/uploads/${subfolder_path}/`;

  //define storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, up_folder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  // Multer upload object

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMessage));
      }
    },
  });

  return upload;
}

module.exports = uploader;
