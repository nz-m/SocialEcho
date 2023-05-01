const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const Post = require("../models/Post");
const Community = require("../models/Community");
const UserPreference = require("../models/UserPreference");
const formatCreatedAt = require("../utils/timeConverter");
const { verifyContextData } = require("./authController");
const getUserFromToken = require("../utils/getUserFromToken");
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const signin = async (req, res, next) => {
  await saveLogInfo(req, "User attempting to sign in", "sign in", "info");
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      await saveLogInfo(req, "Incorrect email", "sign in", "error");
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      await saveLogInfo(req, "Incorrect password", "sign in", "error");
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isContextAuthEnabled = await UserPreference.findOne({
      user: existingUser._id,
      enableContextBasedAuth: true,
    });

    if (isContextAuthEnabled) {
      const contextDataResult = await verifyContextData(req, existingUser);

      if (contextDataResult === "blocked") {
        await saveLogInfo(
          req,
          "Sign in attempt from blocked device",
          "sign in",
          "warn"
        );
        return res.status(401).json({
          message:
            "You've been blocked due to suspicious login activity. Please contact support for assistance.",
        });
      }

      if (
        contextDataResult === "no_context_data" ||
        contextDataResult === "error"
      ) {
        await saveLogInfo(
          req,
          "Error occurred while verifying context data",
          "sign in",
          "error"
        );
        return res.status(500).json({
          message: "Error occurred while verifying context data",
        });
      }

      if (contextDataResult === "already_exists") {
        await saveLogInfo(
          req,
          "Multiple sign in attempts detected without verifying identity.",
          "sign in",
          "warn"
        );

        return res.status(401).json({
          message: `You've temporarily been blocked due to suspicious login activity. We have already sent a verification email to your registered email address. 
          Please follow the instructions in the email to verify your identity and gain access to your account.

          Please note that repeated attempts to log in without verifying your identity will result in this device being permanently blocked from accessing your account.
          
          Thank you for your cooperation`,
        });
      }

      if (contextDataResult.mismatchedProps) {
        const mismatchedProps = contextDataResult.mismatchedProps;
        const currentContextData = contextDataResult.currentContextData;
        if (
          mismatchedProps.some((prop) =>
            [
              "ip",
              "country",
              "city",
              "device",
              "deviceType",
              "os",
              "platform",
              "browser",
            ].includes(prop)
          )
        ) {
          req.mismatchedProps = mismatchedProps;
          req.currentContextData = currentContextData;
          req.user = existingUser;
          return next();
        }
      }
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

    const newRefreshToken = new Token({
      user: existingUser._id,
      refreshToken,
      accessToken,
    });
    await newRefreshToken.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar,
      },
    });
  } catch (err) {
    await saveLogInfo(
      req,
      `Error occurred while signing in user: ${err.message}`,
      "sign in",
      "error"
    );

    res.status(500).json({
      message: "Something went wrong",
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

/**
 * @async
 * @function getUser
 * 
 * @description Retrieves a user's profile information, including their total number of posts,
 * the number of communities they are in, the number of communities they have posted in,
 * and their duration on the platform.

 * @param {Function} next - Express next function

 * @throws {Error} If an error occurs while retrieving the user's information
 * 
 * @returns {Object} Returns the user's profile information.
 */
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    const totalPosts = await Post.countDocuments({ user: user._id });

    const communities = await Community.find({ members: user._id });
    const totalCommunities = communities.length;

    const postCommunities = await Post.find({ user: user._id }).distinct(
      "community"
    );
    const totalPostCommunities = postCommunities.length;

    const createdAt = dayjs(user.createdAt);
    const now = dayjs();
    const durationObj = dayjs.duration(now.diff(createdAt));
    const durationMinutes = durationObj.asMinutes();
    const durationHours = durationObj.asHours();
    const durationDays = durationObj.asDays();

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
      .limit(20)
      .lean()
      .sort({ createdAt: -1 });

    user.posts = posts.map((post) => ({
      ...post,
      isMember: post.community?.members
        .map((member) => member.toString())
        .includes(user._id.toString()),
      createdAt: formatCreatedAt(post.createdAt),
    }));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Adds a new user to the database with the given name, email, password, and avatar.
 *
 * @async
 * @function addUser
 *
 * @description If the email domain of the user's email is "mod.socialecho.com", the user will be
 * assigned the role of "moderator" by default, but not necessarily as a moderator of any community.
 * Otherwise, the user will be assigned the role of "general" user.
 *
 * @param {string} req.body.name - The name of the user to be added.
 * @param {string} req.body.email - The email of the user to be added.
 * @param {string} req.body.password - The password of the user to be added.
 * @param {Object} req.files - The files attached to the request object (for avatar).
 * @param {Function} next - The next middleware function to call if consent is given by the user to enable context based auth.
 *
 * @returns {Object} The response object with a success message if the user is added successfully.
 *
 * @throws {Error} If an error occurs while hashing the user password, or saving the new user to the database.
 */
const addUser = async (req, res, next) => {
  await saveLogInfo(req, "New user registration initiated", "info");
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const fileUrl = req.files?.[0]?.filename
    ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${
        req.files[0].filename
      }`
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
    if (newUser.isNew) {
      throw new Error("Failed to add user");
    }

    if (req.body.isConsentGiven === "false") {
      res.status(201).json({
        message: "User added successfully",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? null;
    if (accessToken) {
      await Token.deleteOne({ accessToken });
      await saveLogInfo(null, `User has logged out`, "logout", "info");
    }
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    await saveLogInfo(null, err.message, "logout", "error");
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const existingToken = await Token.findOne({
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

    return res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    });
  } catch (err) {
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

    const { location, interests, bio } = req.body;

    user.location = location;
    user.interests = interests;
    user.bio = bio;

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
