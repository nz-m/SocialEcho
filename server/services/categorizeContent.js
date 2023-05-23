const { saveLogInfo } = require("../middlewares/logger/logInfo");
const axios = require("axios");

const getCategoriesFromTextRazor = async (content) => {
  const API_KEY = process.env.TEXTRAZOR_API_KEY;
  const API_URL = process.env.TEXTRAZOR_API_URL;

  let categories = {};

  try {
    const response = await axios.post(
      API_URL,
      {
        text: content,
        classifiers: "community",
        cleanup: {
          mode: "stripTags",
        },
      },
      {
        headers: {
          "X-TextRazor-Key": API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "gzip",
        },
      }
    );

    response.data.response.categories?.forEach((category) => {
      categories[category.label] = category.score;
    });

    return categories;
  } catch (error) {
    const { status, statusText } = error.response;
    throw new Error(`Error ${status}: ${statusText}`);
  }
};

const getCategoriesFromAPI = async (content) => {
  const classifier_api_url = process.env.CLASSIFIER_API_URL;

  let categories = {};

  try {
    const response = await axios.post(
      classifier_api_url,
      {
        text: content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.response.categories) {
      response.data.response.categories.forEach((category) => {
        categories[category.label] = category.score;
      });
    }

    return categories;
  } catch (error) {
    const { status, statusText } = error.response;
    throw new Error(`Error ${status}: ${statusText}`);
  }
};

async function getCategoriesFromInterfaceAPI(content) {
  const API_URL = process.env.INTERFACE_API_URL;
  const API_KEY = process.env.INTERFACE_API_KEY;

  const CANDIDATE_LABELS = [
    "programming",
    "health_and_fitness",
    "travel",
    "food_and_cooking",
    "music",
    "sports",
    "fashion",
    "art_and_design",
    "business_and_entrepreneurship",
    "education",
  ];

  const categories = {};

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: content,
        parameters: { candidate_labels: CANDIDATE_LABELS },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;
    const scores = result.scores;
    const labels = result.labels;

    labels.forEach((label, index) => {
      categories[label] = scores[index];
    });

    return categories;
  } catch (error) {
    const { status, statusText } = error.response;
    throw new Error(`Error ${status}: ${statusText}`);
  }
}

const processTextRazorResponse = async (req, res, next) => {
  try {
    const { content, communityName } = req.body;
    const categories = await getCategoriesFromTextRazor(content);

    console.log(categories);

    if (Object.keys(categories).length > 0) {
      const prohibitedAttributes = Object.keys(categories).join(", ");
      const message = `Sorry, your post cannot be published due to inappropriate content. It violates our community guidelines regarding ${prohibitedAttributes}. Please revise your post and try again.`;
      return res.status(400).json({ message });
    } else next();
  } catch (error) {
    await saveLogInfo(null, error.message, "TextRazor API", "error");
    next();
  }
};

const processClassifierAPIResponse = async (req, res, next) => {
  try {
    const { content } = req.body;
    const categories = await getCategoriesFromAPI(content);

    console.log(categories);

    if (Object.keys(categories).length > 0) {
      const prohibitedAttributes = Object.keys(categories).join(", ");
      const message = `Sorry, your post cannot be published due to inappropriate content. It violates our community guidelines regarding ${prohibitedAttributes}. Please revise your post and try again.`;
      return res.status(400).json({ message });
    } else next();
  } catch (error) {
    await saveLogInfo(null, error.message, "Classifier API", "error");
    next();
  }
};

const processInterfaceAPIResponse = async (req, res, next) => {
  try {
    const { content } = req.body;
    const categories = await getCategoriesFromInterfaceAPI(content);

    console.log(categories);

    if (Object.keys(categories).length > 0) {
      const prohibitedAttributes = Object.keys(categories).join(", ");
      const message = `Sorry, your post cannot be published due to inappropriate content. It violates our community guidelines regarding ${prohibitedAttributes}. Please revise your post and try again.`;
      return res.status(400).json({ message });
    } else next();
  } catch (error) {
    await saveLogInfo(null, error.message, "Interface API", "error");
    next();
  }
};

module.exports = {
  processTextRazorResponse,
  processClassifierAPIResponse,
  processInterfaceAPIResponse,
};
