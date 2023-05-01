const geoip = require("geoip-lite");
const getCurrentContextData = (req) => {
  const ip = req.clientIp || "unknown";
  const location = geoip.lookup(ip) || "unknown";
  const country = location.country ? location.country.toString() : "unknown";
  const city = location.city ? location.city.toString() : "unknown";
  const browser = req.useragent.browser
    ? `${req.useragent.browser} ${req.useragent.version}`
    : "unknown";
  const platform = req.useragent.platform
    ? req.useragent.platform.toString()
    : "unknown";
  const os = req.useragent.os ? req.useragent.os.toString() : "unknown";
  const device = req.useragent.device
    ? req.useragent.device.toString()
    : "unknown";

  const isMobile = req.useragent.isMobile || false;
  const isDesktop = req.useragent.isDesktop || false;
  const isTablet = req.useragent.isTablet || false;

  const deviceType = isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : isTablet
    ? "Tablet"
    : "unknown";
  return { ip, country, city, browser, platform, os, device, deviceType };
};

module.exports = getCurrentContextData;
