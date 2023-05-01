const Log = require("../../models/Log");
const getContextInfo = require("../../utils/contextData");
const formatCreatedAt = require("../../utils/timeConverter");

const saveLogInfo = async (req, message, type, level) => {
  try {
    if (req) {
      const { email } = req.body;
      const { ip, country, city, browser, platform, os, device, deviceType } =
        getContextInfo(req);

      const context = `IP: ${ip},Country: ${country}, City: ${city}, Device Type: ${deviceType}, Browser: ${browser}, Platform: ${platform}, OS: ${os}, Device: ${device}`;
      const log = new Log({
        email,
        context,
        message,
        type,
        level,
      });
      await log.save();
    } else {
      const log = new Log({
        message,
        type,
        context: "N/A",
        level,
      });
      await log.save();
    }
  } catch (error) {
    console.log(error);
  }
};

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
        email: log.email,
        contextData: formattedContext,
        message: log.message,
        type: log.type,
        level: log.level,
        formattedTimestamp: formattedTimestamp,
        timestamp: log.timestamp,
      };
    });

    const formattedLogoutLogs = logoutLogs.map((log) => {
      const formattedTimestamp = formatCreatedAt(log.timestamp);

      return {
        email: log.email,
        message: log.message,
        type: log.type,
        level: log.level,
        formattedTimestamp: formattedTimestamp,
        timestamp: log.timestamp,
      };
    });

    const formattedLogs = [...formattedSignInLogs, ...formattedLogoutLogs].sort(
      (a, b) => {
        return a.timestamp - b.timestamp;
      }
    );

    res.status(200).json(formattedLogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveLogInfo, retrieveLogInfo };
