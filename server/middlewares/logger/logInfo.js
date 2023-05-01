const Log = require("../../models/Log");
const getCurrentContextData = require("../../utils/contextData");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

/**
 * Saves log info to the database
 * @param req - request object
 * @param message - log message
 * @param type - log type (sign in, sign out)
 * @param level - log level (error, warning, info)
 * @returns {Promise<void>}
 */
const saveLogInfo = async (req, message, type, level) => {
  try {
    if (req) {
      const { email } = req.body;
      const { ip, country, city, browser, platform, os, device, deviceType } =
        getCurrentContextData(req);

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
    return;
  }
};

module.exports = { saveLogInfo };
