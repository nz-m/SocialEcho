const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const pendingPostSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    fileType: {
      type: String,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending"],
      default: "pending",
    },
    confirmationToken: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

pendingPostSchema.pre("remove", async function (next) {
  try {
    if (this.fileUrl) {
      const filename = path.basename(this.fileUrl);
      const deleteFilePromise = promisify(fs.unlink)(
        path.join(__dirname, "../assets/userFiles", filename)
      );
      await deleteFilePromise;
    }
    next();
  } catch (error) {
    next(error);
  }
});

pendingPostSchema.pre("deleteMany", async function (next) {
  try {
    const pendingPosts = await this.model.find(this.getFilter());
    for (const post of pendingPosts) {
      if (post.fileUrl) {
        const filename = path.basename(post.fileUrl);
        const deleteFilePromise = promisify(fs.unlink)(
          path.join(__dirname, "../assets/userFiles", filename)
        );
        await deleteFilePromise;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("PendingPost", pendingPostSchema);
