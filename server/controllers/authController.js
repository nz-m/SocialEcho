const UserContext = require("../models/UserContext");
const geoip = require("geoip-lite");

const getContextData = async (req, res) => {
  try {
    const userContextData = await UserContext.findById(req.params.id);

    const ip = userContextData.ip;
    const browser = userContextData.browser;
    const version = userContextData.version;
    const platform = userContextData.platform;
    const os = userContextData.os;
    const device = userContextData.device;
    const deviceType = userContextData.deviceType;
    const country = userContextData.country;
    const city = userContextData.city;
    const latitude = userContextData.latitude;
    const longitude = userContextData.longitude;
    const timezone = userContextData.timezone;

    res.status(200).json({
      message: `Your IP is ${ip}. You are using ${browser} ${version} on ${platform} ${os} ${device} ${deviceType} from ${country} ${city} ${latitude} ${longitude} ${timezone}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addContextData = async (req, res) => {
  const ip = req.ip || "N/A";
  const location = geoip.lookup(ip) || "N/A";
  const country = location.country ? location.country.toString() : "N/A";
  const city = location.city ? location.city.toString() : "N/A";
  const latitude = location.ll?.[0] ? location.ll[0].toString() : "N/A";
  const longitude = location.ll?.[1] ? location.ll[1].toString() : "N/A";
  const timezone = location.timezone ? location.timezone.toString() : "N/A";
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
    ip,
    country,
    city,
    latitude,
    longitude,
    timezone,
    browser,
    version,
    platform,
    os,
    device,
    deviceType,
  });

  try {
    await newUserContext.save();
    res.status(200).json({ message: "Context data saved successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Error while saving context data",
    });
  }
};

module.exports = {
  getContextData,
  addContextData,
};
