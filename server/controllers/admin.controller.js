const Log = require("../models/Log");
const dayjs = require("dayjs");
const formatCreatedAt = require("../utils/timeConverter");

/**
 * Retrieves log info from the database
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

const deleteLogInfo = async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).json({ message: "All logs deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { retrieveLogInfo, deleteLogInfo };
