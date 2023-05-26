const Log = require("../models/log.model");
const dayjs = require("dayjs");
const formatCreatedAt = require("../utils/timeConverter");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminToken = require("../models/token.admin.model");
const Config = require("../models/config.model");

/**
 * @route GET /admin/logs
 */
const retrieveLogInfo = async (req, res) => {
  try {
    // Only sign in logs contain encrypted context data & email
    const [signInLogs, generalLogs] = await Promise.all([
      Log.find({ type: "sign in" }).sort({ createdAt: -1 }).limit(50),

      Log.find({ type: { $ne: "sign in" } })
        .sort({ createdAt: -1 })
        .limit(50),
    ]);

    const formattedSignInLogs = [];
    for (let i = 0; i < signInLogs.length; i++) {
      const { _id, email, context, message, type, level, timestamp } =
        signInLogs[i];
      const contextData = context.split(",");
      const formattedContext = {};

      for (let j = 0; j < contextData.length; j++) {
        const [key, value] = contextData[j].split(":");
        if (key === "IP") {
          formattedContext["IP Address"] = contextData[j]
            .split(":")
            .slice(1)
            .join(":");
        } else {
          formattedContext[key.trim()] = value.trim();
        }
      }

      formattedSignInLogs.push({
        _id,
        email,
        contextData: formattedContext,
        message,
        type,
        level,
        timestamp,
      });
    }
    const formattedGeneralLogs = generalLogs.map((log) => ({
      _id: log._id,
      email: log.email,
      message: log.message,
      type: log.type,
      level: log.level,
      timestamp: log.timestamp,
    }));

    const formattedLogs = [...formattedSignInLogs, ...formattedGeneralLogs]
      .map((log) => ({
        ...log,
        formattedTimestamp: formatCreatedAt(log.timestamp),
        relativeTimestamp: dayjs(log.timestamp).fromNow(),
      }))
      .sort((a, b) => b.timestamp - a.timestamp);

    res.status(200).json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @route DELETE /admin/logs
 */
const deleteLogInfo = async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).json({ message: "All logs deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * @route POST /admin/signin
 */
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Admin.findOne({
      username
    });
    if (!existingUser) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const payload = {
      id: existingUser._id,
      username: existingUser.username,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "6h",
    });

    const newAdminToken = new AdminToken({
      user: existingUser._id,
      accessToken,
    });

    await newAdminToken.save();

    res.status(200).json({
      accessToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

/**
 * @route GET /admin/preferences
 */
const retrieveServicePreference = async (req, res) => {
  try {
    const config = await Config.findOne({});

    if (!config) {
      const newConfig = new Config();
      await newConfig.save();
      return res.status(200).json(newConfig);
    }

    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving system preferences" });
  }
};

/**
 * @route PUT /admin/preferences
 */
const updateServicePreference = async (req, res) => {
  try {
    const {
      usePerspectiveAPI,
      categoryFilteringServiceProvider,
      categoryFilteringRequestTimeout,
    } = req.body;

    const config = await Config.findOneAndUpdate(
      {},
      {
        usePerspectiveAPI,
        categoryFilteringServiceProvider,
        categoryFilteringRequestTimeout,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "Error updating system preferences" });
  }
};

module.exports = {
  retrieveServicePreference,
  updateServicePreference,
  retrieveLogInfo,
  deleteLogInfo,
  signin,
};
