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
      const bestMatchCategory = Object.keys(categories)[0];

      if (bestMatchCategory !== communityName) {
        const message = `Hi there! We noticed that your post in the ${communityName} community may not be the best fit for that community. However, we think that your post could be a great fit for the ${bestMatchCategory} community! Here are a few tips to help you improve your post and make it more successful:

- Consider adding more detail or context to your post to help readers understand your perspective.
- Try to focus on the most important aspects of your post, and avoid including too much information that may be distracting.
- Consider using more descriptive titles or tags to help readers find your post more easily.

We appreciate your effort in creating this post, and we hope that these tips will help you improve it and make it more successful in the future. Thanks for being a part of our community!`;
        return res.status(400).json({ message });
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
