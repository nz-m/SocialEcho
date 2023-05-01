const express = require("express");
const router = express.Router();
const { retrieveLogInfo } = require("../middlewares/logger/logInfo");

router.get("/logs", retrieveLogInfo);

module.exports = router;
