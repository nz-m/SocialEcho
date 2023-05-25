const axios = require("axios");

const getCategoriesFromTextRazor = async (content) => {
  const API_KEY = process.env.TEXTRAZOR_API_KEY;
  const API_URL = process.env.TEXTRAZOR_API_URL;

  if (!API_KEY || !API_URL) {
    throw new Error("TextRazor API key or URL not set");
  }

  const categories = {};

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

    if (response.data.response.categories) {
      response.data.response.categories.forEach(({ label, score }) => {
        categories[label] = score;
      });
    }

    return categories;
  } catch (error) {
    const { status, statusText } = error.response;
    throw new Error(`Error ${status}: ${statusText}`);
  }
};

const getCategoriesFromClassifierAPI = async (content) => {
  const classifier_api_url = process.env.CLASSIFIER_API_URL;
  if (!classifier_api_url) {
    throw new Error("Classifier API URL not set");
  }

  const scoreThreshold = 0.1;

  const categories = {};

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
      response.data.response.categories.forEach(({ label, score }) => {
        if (score > scoreThreshold) {
          categories[label] = score;
        }
      });
    }

    return categories;
  } catch (error) {
    const { status, statusText } = error.response;
    throw new Error(`Error ${status}: ${statusText}`);
  }
};

const getCategoriesFromInterfaceAPI = async (content) => {
  const API_URL = process.env.INTERFACE_API_URL;
  const API_KEY = process.env.INTERFACE_API_KEY;
  const scoreThreshold = 0.1;

  if (!API_KEY || !API_URL) {
    throw new Error("Interface API key or URL not set");
  }

  const CANDIDATE_LABELS = [
    "Programming",
    "Health and Fitness",
    "Travel",
    "Food and Cooking",
    "Music",
    "Sports",
    "Fashion",
    "Art and Design",
    "Business and Entrepreneurship",
    "Education",
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

    const { labels, scores } = response.data;

    labels.forEach((label, index) => {
      const score = scores[index];
      if (score >= scoreThreshold) {
        categories[label] = score;
      }
    });

    return categories;
  } catch (error) {
    const { status, statusText } = error.response;
    throw new Error(`Error ${status}: ${statusText}`);
  }
};

module.exports = {
  getCategoriesFromTextRazor,
  getCategoriesFromClassifierAPI,
  getCategoriesFromInterfaceAPI,
};
