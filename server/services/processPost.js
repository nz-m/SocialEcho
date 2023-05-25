const { saveLogInfo } = require("../middlewares/logger/logInfo");
const createCategoryFilterService = require("./categoryFilterService");
const jsonfile = require("jsonfile");

const processPost = async (req, res, next) => {
  const serviceProvider = jsonfile.readFileSync(
    "./config/system-preferences.json"
  ).categoryFilteringService;

  try {
    const { content, communityName } = req.body;

    const categoryFilterService = createCategoryFilterService(serviceProvider);

    const categories = await categoryFilterService.getCategories(content);

    if (Object.keys(categories).length > 0) {
      const bestMatchCategory = Object.keys(categories)[0];

      if (bestMatchCategory !== communityName) {
        const message = `Hi there! We noticed that your post in the ${communityName} community may not be the best fit for that community. However, we think that your post could be a great fit for the ${bestMatchCategory} community! Here are a few tips to help you improve your post and make it more successful:

- Consider adding more detail or context to your post to help readers understand your perspective.
- Try to focus on the most important aspects of your post, and avoid including too much information that may be distracting.
- Consider using more descriptive titles or tags to help readers find your post more easily.

We appreciate your effort in creating this post, and we hope that these tips will help you improve it and make it more successful in the future. Thanks for being a part of our community!`;
        return res.status(400).json({ message });
      }
    }

    next();
  } catch (error) {
    await saveLogInfo(null, error.message, serviceProvider, "error");
    next();
  }
};

module.exports = processPost;
