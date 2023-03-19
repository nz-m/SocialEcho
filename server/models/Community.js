const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    banner: {
      type: String,
    },

    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    bannedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    reportedPosts: {
      type: [
        {
          post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
          reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          reportReason: { type: String },
          reportDate: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    rules: [
      {
        type: Schema.Types.ObjectId,
        ref: "ModerationRule",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

communitySchema.pre("remove", async function (next) {
  try {
    const postIds = this.posts.map((post) => post.toString());
    await this.model("Post").deleteMany({ _id: { $in: postIds } });
    next();
  } catch (err) {
    next(err);
  }
});
const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
