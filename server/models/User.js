const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },

    location: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    profession: {
      type: String,
      default: "",
    },

    interests: {
      type: [String],
      maxlength: 3,
      default: [],
    },

    role: {
      type: String,
      enum: ["general", "moderator", "admin"],
      default: "general",
    },

    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("remove", async function (next) {
  try {
    // Todo: user avatar delete (fs.unlink/ promisify)

    // Remove all posts and comments by the user
    await this.model("Post").deleteMany({ user: this._id });
    await this.model("Comment").deleteMany({ user: this._id });

    // Remove the user from all communities they belong to
    await this.model("Community").updateMany(
      { members: this._id },
      { $pull: { members: this._id } }
    );

    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
