const UserContext = require("../models/UserContext");
const geoip = require("geoip-lite");

const verifyContextData = async (req, existingUser) => {
  try {
    const { _id } = existingUser;
    const userContextData = await UserContext.findOne({ user: _id });

    if (!userContextData) {
      return "no_context_data";
    }

    const { ip, browser, device, deviceType, country, city } = userContextData;
    const currentContextData = getCurrentContextData(req);

    const mismatchedProps = [];

    if (ip !== currentContextData.ip) {
      mismatchedProps.push("ip");
    }
    if (browser !== currentContextData.browser) {
      mismatchedProps.push("browser");
    }
    if (device !== currentContextData.device) {
      mismatchedProps.push("device");
    }
    if (deviceType !== currentContextData.deviceType) {
      mismatchedProps.push("deviceType");
    }
    if (country !== currentContextData.country) {
      mismatchedProps.push("country");
    }
    if (city !== currentContextData.city) {
      mismatchedProps.push("city");
    }

    if (mismatchedProps.length > 0) {
      return {
        mismatchedProps: mismatchedProps,
        currentContextData: currentContextData,
      };
    }

    return "match";
  } catch (error) {
    return "error";
  }
};

const addContextData = async (req, res) => {
  const userId = req.userId;
  const email = req.email;
  const ip = req.ip || "N/A";
  const location = geoip.lookup(ip) || "N/A";
  const country = location.country ? location.country.toString() : "N/A";
  const city = location.city ? location.city.toString() : "N/A";
  const browser = req.useragent.browser
    ? req.useragent.browser.toString()
    : "N/A";
  const version = req.useragent.version
    ? req.useragent.version.toString()
    : "N/A";
  const platform = req.useragent.platform
    ? req.useragent.platform.toString()
    : "N/A";
  const os = req.useragent.os ? req.useragent.os.toString() : "N/A";
  const device = req.useragent.device ? req.useragent.device.toString() : "N/A";

  const isMobile = req.useragent.isMobile || false;
  const isDesktop = req.useragent.isDesktop || false;
  const isTablet = req.useragent.isTablet || false;

  const deviceType = isMobile
    ? "mobile"
    : isDesktop
    ? "desktop"
    : isTablet
    ? "tablet"
    : "unknown";

  const newUserContext = new UserContext({
    user: userId,
    email,
    ip,
    country,
    city,
    browser,
    version,
    platform,
    os,
    device,
    deviceType,
  });

  try {
    await newUserContext.save();
    res.status(200).json({
      message: "Email verification process was successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getCurrentContextData = (req) => {
  const ip = req.clientIp || "N/A";
  const location = geoip.lookup(ip) || "N/A";
  const country = location.country ? location.country.toString() : "N/A";
  const city = location.city ? location.city.toString() : "N/A";
  const browser = req.useragent.browser
    ? req.useragent.browser.toString()
    : "N/A";
  const version = req.useragent.version
    ? req.useragent.version.toString()
    : "N/A";
  const platform = req.useragent.platform
    ? req.useragent.platform.toString()
    : "N/A";
  const os = req.useragent.os ? req.useragent.os.toString() : "N/A";
  const device = req.useragent.device ? req.useragent.device.toString() : "N/A";

  const isMobile = req.useragent.isMobile || false;
  const isDesktop = req.useragent.isDesktop || false;
  const isTablet = req.useragent.isTablet || false;

  const deviceType = isMobile
    ? "mobile"
    : isDesktop
    ? "desktop"
    : isTablet
    ? "tablet"
    : "unknown";

  const currentContextData = {
    ip,
    country,
    city,
    browser,
    version,
    platform,
    os,
    device,
    deviceType,
  };

  return currentContextData;
};

module.exports = {
  verifyContextData,
  addContextData,
};
