const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const { BlobServiceClient } = require("@azure/storage-blob");

const postSchema = new Schema(
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

postSchema.index({ content: "text" });

postSchema.pre("remove", async function (next) {
  try {
    if (this.fileUrl) {
      const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_CONNECTION_STRING
      );
      const containerName = "userfiles";
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobName = path.basename(this.fileUrl);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const deleteResponse = await blockBlobClient.delete();
      console.log(
        `Blob deleted from Azure Blob Storage: ${deleteResponse.requestId}`
      );
    }

    await this.model("Comment").deleteMany({ _id: this.comments });

    await this.model("Report").deleteOne({
      post: this._id,
    });

    await this.model("User").updateMany(
      {
        savedPosts: this._id,
      },
      {
        $pull: {
          savedPosts: this._id,
        },
      }
    );
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Post", postSchema);
