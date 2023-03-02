const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      trim: true,
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// when a post is deleted, delete all comments associated with it
postSchema.pre("remove", async function (next) {
  // Path may required to move to .env file/ config file
  try {
    if (this.fileUrl) {
      const filename = path.basename(this.fileUrl);
      console.log(filename);
      const deleteFilePromise = promisify(fs.unlink)(
        path.join(__dirname, "../assets/userFiles", filename)
      );
      console.log(path.join(__dirname, "../assets/userFiles", filename));
      await deleteFilePromise;
    }
    const commentIds = this.comments.map((comment) => comment.toString());
    await this.model("Comment").deleteMany({ _id: { $in: commentIds } });

    next();
  } catch (err) {
    next(err);
  }

  // Delete the uploaded file if it exists
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
