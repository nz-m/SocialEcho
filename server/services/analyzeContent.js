const { google } = require("googleapis");
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const Config = require("../models/config.model");

const analyzeTextWithPerspectiveAPI = async (
  content,
  API_KEY,
  DISCOVERY_URL,
  timeout
) => {
  const SCORE_THRESHOLD = 0.5;

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
        // UNSUBSTANTIAL: {},
        INSULT: {},
        PROFANITY: {},
        THREAT: {},
        SEXUALLY_EXPLICIT: {},
        IDENTITY_ATTACK: {},
        TOXICITY: {},
      },
    };

    const responsePromise = client.comments.analyze({
      key: API_KEY,
      resource: analyzeRequest,
    });

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeout);
    });

    const response = await Promise.race([responsePromise, timeoutPromise]);

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

const analyzeContent = async (req, res, next) => {
  const timeout = 5000; // 5 seconds
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
      DISCOVERY_URL,
      timeout
    );

    if (Object.keys(summaryScores).length > 0) {
      const type = "inappropriateContent";
      return res.status(403).json({ type });
    } else {
      next();
    }
  } catch (error) {
    const errorMessage = `Error processing Perspective API response: ${error.message}`;
    await saveLogInfo(null, errorMessage, "Perspective API", "error");
    next();
  }
};

module.exports = analyzeContent;
