const express = require("express");
const router = express.Router();
const {
  retrieveLogInfo,
  deleteLogInfo,
} = require("../controllers/admin.controller");

router.route("/logs").get(retrieveLogInfo).delete(deleteLogInfo);

module.exports = router;
