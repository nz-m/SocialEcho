const express = require("express");
const router = express.Router();
const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
} = require("../controllers/admin.controller");

router.route("/logs").get(retrieveLogInfo).delete(deleteLogInfo);
router.post("/signin", signin);

module.exports = router;
