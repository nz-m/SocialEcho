const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const Post = require("../models/Post");
const Community = require("../models/Community");
const { logger } = require("../utils/logger");
const getUserFromToken = require("../utils/getUserFromToken");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
// TODO - Invalidate old tokens/JTI
// sign in

const signin = async (req, res) => {
  logger.info("User attempting to sign in");
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      logger.error("User not found");
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      logger.error("Invalid credentials");
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // delete existing refresh token for user
    await RefreshToken.deleteOne({
      user: existingUser._id,
    });

    // create new instance of RefreshToken model and save to database
    const newRefreshToken = new RefreshToken({
      user: existingUser._id,
      refreshToken,
      accessToken,
    });
    await newRefreshToken.save();

    // send BOTH tokens to client AND the user data
    res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (err) {
    logger.error(`Error occurred while signing in user: ${err.message}`);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getUsers = async (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => next(err));
};

// get user by id
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    // Get total number of posts created by the user
    const totalPosts = await Post.countDocuments({ user: user._id });

    // Get the number of communities the user is in
    const communities = await Community.find({ members: user._id });
    const totalCommunities = communities.length;

    // Get the number of communities the user posted in
    const postCommunities = await Post.find({ user: user._id }).distinct(
      "community"
    );
    const totalPostCommunities = postCommunities.length;

    // Calculate user's duration on the platform
    const createdAt = dayjs(user.createdAt);
    const now = dayjs();
    const durationObj = dayjs.duration(now.diff(createdAt));
    const durationMinutes = durationObj.asMinutes();
    const durationHours = durationObj.asHours();
    const durationDays = durationObj.asDays();

    // Add duration and other info to user object
    user.totalPosts = totalPosts;
    user.totalCommunities = totalCommunities;
    user.totalPostCommunities = totalPostCommunities;
    user.duration = "";

    if (durationMinutes < 60) {
      user.duration = `${Math.floor(durationMinutes)} minutes`;
    } else if (durationHours < 24) {
      user.duration = `${Math.floor(durationHours)} hours`;
    } else if (durationDays < 365) {
      user.duration = `${Math.floor(durationDays)} days`;
    } else {
      const durationYears = Math.floor(durationDays / 365);
      user.duration = `${durationYears} years`;
    }

    const posts = await Post.find({ user: user._id })
      .populate("community", "name members")
      .lean();

    const formattedPosts = posts.map((post) => ({
      ...post,
      isMember: post.community.members
        .map((member) => member.toString())
        .includes(user._id.toString()),
    }));

    user.posts = formattedPosts;

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// add user
const addUser = async (req, res) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { filename } =
    req.files && req.files.length > 0
      ? req.files[0]
      : {
          filename: null,
        };
  const fileUrl = filename
    ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${filename}`
    : null;

  const emailDomain = req.body.email.split("@")[1];
  const role = emailDomain === "mod.socialecho.com" ? "moderator" : "general";

  newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: role,
    avatar: fileUrl,
  });

  try {
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User added successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User not added",
      error: err.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = req.headers.authorization?.split(" ")[1] ?? null;

    const tokenPair = await RefreshToken.findOne({ accessToken });
    if (!tokenPair || tokenPair.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    await tokenPair.deleteOne();

    logger.info(`User with access token ${accessToken} has logged out`);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    logger.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: err.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const existingToken = await RefreshToken.findOne({
      refreshToken,
    });
    if (!existingToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
    const existingUser = await User.findById(existingToken.user);
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return res.status(401).json({
        message: "Expired refresh token",
      });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    // Return new access token
    return res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getModProfile = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const moderator = await User.findById(userId);
    if (!moderator) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // exclude password from response
    const moderatorInfo = {
      ...moderator._doc,
    };
    delete moderatorInfo.password;
    moderatorInfo.createdAt = moderatorInfo.createdAt.toLocaleString();

    return res.status(200).json({
      moderatorInfo,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// update user info (location, interest, profession)
const updateInfo = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { location, interests, profession } = req.body;

    user.location = location;
    user.interests = interests;
    user.profession = profession;

    await user.save();

    return res.status(200).json({
      message: "User info updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating user info",
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
};
