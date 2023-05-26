const { google } = require("googleapis");
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const Config = require("../models/config.model");

const analyzeTextWithPerspectiveAPI = async (
  content,
  API_KEY,
  DISCOVERY_URL
) => {
  const SCORE_THRESHOLD = 0.6;

  if (!API_KEY || !DISCOVERY_URL) {
    throw new Error("Perspective API URL or API Key not set");
  }

  try {
    const client = await google.discoverAPI(DISCOVERY_URL);

    const analyzeRequest = {
      comment: {
        text: content,
      },
      requestedAttributes: {
        // SPAM: {},
        INSULT: {},
        PROFANITY: {},
        THREAT: {},
        SEXUALLY_EXPLICIT: {},
        IDENTITY_ATTACK: {},
        TOXICITY: {},
      },
    };

    const response = await client.comments.analyze({
      key: API_KEY,
      resource: analyzeRequest,
    });

    const summaryScores = {};
    for (const attribute in response.data.attributeScores) {
      const summaryScore =
        response.data.attributeScores[attribute].summaryScore.value;
      if (summaryScore >= SCORE_THRESHOLD) {
        summaryScores[attribute] = summaryScore;
      }
    }

    return summaryScores;
  } catch (error) {
    throw new Error(`Error analyzing text: ${error.message}`);
  }
};

const processPerspectiveAPIResponse = async (req, res, next) => {
  const API_KEY = process.env.PERSPECTIVE_API_KEY;
  const DISCOVERY_URL = process.env.PERSPECTIVE_API_DISCOVERY_URL;

  let usePerspectiveAPI;
  try {
    const config = await Config.findOne({}, { _id: 0, __v: 0 });
    usePerspectiveAPI = config.usePerspectiveAPI;
  } catch (error) {
    usePerspectiveAPI = false;
  }

  if (!usePerspectiveAPI || !API_KEY || !DISCOVERY_URL) {
    return next();
  }

  try {
    const { content } = req.body;
    const summaryScores = await analyzeTextWithPerspectiveAPI(
      content,
      API_KEY,
      DISCOVERY_URL
    );

    if (Object.keys(summaryScores).length > 0) {
      const prohibitedAttributes = Object.keys(summaryScores).join(", ");
      const message = `Sorry, your post cannot be published due to inappropriate content. It violates our community guidelines regarding ${prohibitedAttributes}. Please revise your post and try again.`;
      return res.status(400).json({ message });
    } else {
      next();
    }
  } catch (error) {
    const errorMessage = `Error processing Perspective API response: ${error.message}`;
    await saveLogInfo(null, errorMessage, "Perspective API", "error");
    return res.status(500).json({ message: "Error processing post" });
  }
};

module.exports = processPerspectiveAPIResponse;
