const UserContext = require("../models/UserContext");
const SuspiciousLogin = require("../models/SuspiciousLogin");
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
    platform,
    os,
    device,
    deviceType,
  };

  return currentContextData;
};

const verifyContextData = async (req, existingUser) => {
  try {
    const { _id } = existingUser;
    const userContextDataRes = await UserContext.findOne({ user: _id });

    if (!userContextDataRes) {
      return "no_context_data";
    }

    const userContextData = {
      ip: userContextDataRes.ip,
      country: userContextDataRes.country,
      city: userContextDataRes.city,
      browser: userContextDataRes.browser,
      platform: userContextDataRes.platform,
      os: userContextDataRes.os,
      device: userContextDataRes.device,
      deviceType: userContextDataRes.deviceType,
    };

    const currentContextData = getCurrentContextData(req);

    const oldSuspiciousContextData = await SuspiciousLogin.findOne({
      user: _id,
      ip: currentContextData.ip,
      country: currentContextData.country,
      city: currentContextData.city,
      browser: currentContextData.browser,
      platform: currentContextData.platform,
      os: currentContextData.os,
      device: currentContextData.device,
      deviceType: currentContextData.deviceType,
    });

    let newSuspiciousData = {};

    if (
      oldSuspiciousContextData &&
      oldSuspiciousContextData.ip !== userContextData.ip &&
      oldSuspiciousContextData.country !== userContextData.country &&
      oldSuspiciousContextData.city !== userContextData.city &&
      oldSuspiciousContextData.browser !== userContextData.browser &&
      oldSuspiciousContextData.platform !== userContextData.platform &&
      oldSuspiciousContextData.os !== userContextData.os &&
      oldSuspiciousContextData.device !== userContextData.device &&
      oldSuspiciousContextData.deviceType !== userContextData.deviceType
    ) {
      const {
        ip: suspiciousIp,
        country: suspiciousCountry,
        city: suspiciousCity,
        browser: suspiciousBrowser,
        platform: suspiciousPlatform,
        os: suspiciousOs,
        device: suspiciousDevice,
        deviceType: suspiciousDeviceType,
      } = oldSuspiciousContextData;

      if (
        suspiciousIp !== currentContextData.ip ||
        suspiciousCountry !== currentContextData.country ||
        suspiciousCity !== currentContextData.city ||
        suspiciousBrowser !== currentContextData.browser ||
        suspiciousDevice !== currentContextData.device ||
        suspiciousDeviceType !== currentContextData.deviceType ||
        suspiciousPlatform !== currentContextData.platform ||
        suspiciousOs !== currentContextData.os
      ) {
        //  Suspicious login data found, but it doesn't match the current context data, so we add new suspicious login data
        const newSuspiciousLogin = new SuspiciousLogin({
          user: _id,
          email: existingUser.email,
          ip: currentContextData.ip,
          country: currentContextData.country,
          city: currentContextData.city,
          browser: currentContextData.browser,
          platform: currentContextData.platform,
          os: currentContextData.os,
          device: currentContextData.device,
          deviceType: currentContextData.deviceType,
        });

        const res = await newSuspiciousLogin.save();

        newSuspiciousData = {
          time: res.createdAt.toLocaleString(),
          ip: res.ip,
          country: res.country,
          city: res.city,
          browser: res.browser,
          platform: res.platform,
          os: res.os,
          device: res.device,
          deviceType: res.deviceType,
        };
      } else {
        // Suspicious login data found, and it matches the current context data, so we return "already_exists"
        return "already_exists";
      }
    } else if (
      oldSuspiciousContextData &&
      oldSuspiciousContextData.ip === userContextData.ip &&
      oldSuspiciousContextData.country === userContextData.country &&
      oldSuspiciousContextData.city === userContextData.city &&
      oldSuspiciousContextData.browser === userContextData.browser &&
      oldSuspiciousContextData.platform === userContextData.platform &&
      oldSuspiciousContextData.os === userContextData.os &&
      oldSuspiciousContextData.device === userContextData.device &&
      oldSuspiciousContextData.deviceType === userContextData.deviceType
    ) {
      return "match";
    } else {
      //  No previous suspicious login data found, so we create a new one
      const newSuspiciousLogin = new SuspiciousLogin({
        user: _id,
        email: existingUser.email,
        ip: currentContextData.ip,
        country: currentContextData.country,
        city: currentContextData.city,
        browser: currentContextData.browser,
        platform: currentContextData.platform,
        os: currentContextData.os,
        device: currentContextData.device,
        deviceType: currentContextData.deviceType,
      });

      const res = await newSuspiciousLogin.save();

      newSuspiciousData = {
        time: res.createdAt.toLocaleString(),
        ip: res.ip,
        country: res.country,
        city: res.city,
        browser: res.browser,
        platform: res.platform,
        os: res.os,
        device: res.device,
        deviceType: res.deviceType,
      };
    }

    const mismatchedProps = [];

    if (userContextData.ip !== newSuspiciousData.ip) {
      mismatchedProps.push("ip");
    }
    if (userContextData.browser !== newSuspiciousData.browser) {
      mismatchedProps.push("browser");
    }
    if (userContextData.device !== newSuspiciousData.device) {
      mismatchedProps.push("device");
    }
    if (userContextData.deviceType !== newSuspiciousData.deviceType) {
      mismatchedProps.push("deviceType");
    }
    if (userContextData.country !== newSuspiciousData.country) {
      mismatchedProps.push("country");
    }
    if (userContextData.city !== newSuspiciousData.city) {
      mismatchedProps.push("city");
    }

    if (mismatchedProps.length > 0) {
      return {
        mismatchedProps: mismatchedProps,
        currentContextData: newSuspiciousData,
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
  const ip = req.ip || "unknown";
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

module.exports = {
  verifyContextData,
  addContextData,
};
