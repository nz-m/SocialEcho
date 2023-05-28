const { saveLogInfo } = require("../middlewares/logger/logInfo");
const createCategoryFilterService = require("./categoryFilterService");
const Config = require("../models/config.model");

/**
 * @param next - confirmPost (/middlewares/post/confirmPost.js)
 */
const processPost = async (req, res, next) => {
  const { content, communityName } = req.body;
  const { serviceProvider, timeout } = await getSystemPreferences();

  try {
    if (serviceProvider === "disabled") {
      req.failedDetection = false;
      return next();
    }

    const categoryFilterService = createCategoryFilterService(serviceProvider);

    const categories = await categoryFilterService.getCategories(
      content,
      timeout
    );

    if (Object.keys(categories).length > 0) {
      const recommendedCommunity = Object.keys(categories)[0];

      if (recommendedCommunity !== communityName) {
        const type = "categoryMismatch";
        const info = {
          community: communityName,
          recommendedCommunity,
        };

        return res.status(403).json({ type, info });
      } else {
        req.failedDetection = false;
        next();
      }
    } else {
      req.failedDetection = true;
      next();
    }
  } catch (error) {
    const errorMessage = `Error processing post: ${error.message}`;
    await saveLogInfo(null, errorMessage, serviceProvider, "error");
    return res.status(500).json({ message: "Error processing post" });
  }
};

const getSystemPreferences = async () => {
  try {
    const config = await Config.findOne({}, { _id: 0, __v: 0 });

    if (!config) {
      return {
        serviceProvider: "disabled",
        timeout: 10000,
      };
    }

    const {
      categoryFilteringServiceProvider: serviceProvider = "disabled",
      categoryFilteringRequestTimeout: timeout = 10000,
    } = config;

    return {
      serviceProvider,
      timeout,
    };
  } catch (error) {
    return {
      serviceProvider: "disabled",
      timeout: 10000,
    };
  }
};

module.exports = processPost;
