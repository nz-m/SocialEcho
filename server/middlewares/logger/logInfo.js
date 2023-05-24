const Log = require("../../models/log.model");
const getCurrentContextData = require("../../utils/contextData");

/**
 * Saves log info to the database
 * @param req - request object
 * @param message {string} - log message
 * @param type {string} - log type (sign in, sign out, api requests)
 * @param level {string} - log level (error, warning, info)
 */
const saveLogInfo = async (req, message, type, level) => {
  try {
    let context = null;
    if (req) {
      const { ip, country, city, browser, platform, os, device, deviceType } =
        getCurrentContextData(req);

      context = `IP: ${ip}, Country: ${country}, City: ${city}, Device Type: ${deviceType}, Browser: ${browser}, Platform: ${platform}, OS: ${os}, Device: ${device}`;
    }

    const log = new Log({
      email: req ? req.body.email : null,
      context,
      message,
      type,
      level,
    });

    await log.save();
  } catch (error) {}
};

module.exports = { saveLogInfo };
