const router = require("express").Router();
const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
} = require("../controllers/admin.controller");

router.post("/signin", signin);

router.route("/logs").get(retrieveLogInfo).delete(deleteLogInfo);

module.exports = router;
