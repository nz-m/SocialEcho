const Log = require("../models/log.model");
const dayjs = require("dayjs");
const formatCreatedAt = require("../utils/timeConverter");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminToken = require("../models/token.admin.model");

/**
 * Retrieves log info from the database
 * @route GET /admin/logs
 * @param req - request object
 * @param res - response object
 * @returns {Promise<void>}
 */
const retrieveLogInfo = async (req, res) => {
  try {
    const logoutLogs = await Log.find({ type: "logout" });
    const signInLogs = await Log.find({ type: "sign in" });

    const formattedSignInLogs = signInLogs.map((log) => {
      const contextData = log.context.split(",");
      const formattedContext = {
        "IP Address": contextData[0].split(": ")[1],
        Location: contextData[1].split(": ")[1],
        Device:
          contextData[3].split(": ")[1] + ", " + contextData[4].split(": ")[1],
        Browser: contextData[5].split(": ")[1],
        "Operating System": contextData[6].split(": ")[1],
        Platform: contextData[7].split(": ")[1],
      };
      const formattedTimestamp = formatCreatedAt(log.timestamp);

      return {
        _id: log._id,
        email: log.email,
        contextData: formattedContext,
        message: log.message,
        type: log.type,
        level: log.level,
        formattedTimestamp: formattedTimestamp,
        timestamp: log.timestamp,
        relativeTimestamp: dayjs(log.timestamp).fromNow(),
      };
    });

    const formattedLogoutLogs = logoutLogs.map((log) => {
      const formattedTimestamp = formatCreatedAt(log.timestamp);

      return {
        _id: log._id,
        email: log.email,
        message: log.message,
        type: log.type,
        level: log.level,
        formattedTimestamp: formattedTimestamp,
        timestamp: log.timestamp,
        relativeTimestamp: dayjs(log.timestamp).fromNow(),
      };
    });

    const formattedLogs = [...formattedSignInLogs, ...formattedLogoutLogs].sort(
      (a, b) => {
        return b.timestamp - a.timestamp;
      }
    );

    res.status(200).json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Deletes all log info from the database
 * @route DELETE /admin/logs
 * @param req
 * @param res
 * @returns {Promise<void>}
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
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Admin.findOne({
      username,
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
      expiresIn: "1h",
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

module.exports = { retrieveLogInfo, deleteLogInfo, signin };
