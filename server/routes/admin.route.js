const router = require("express").Router();
const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
  updateServicePreference,
} = require("../controllers/admin.controller");

router.route("/logs").get(retrieveLogInfo).delete(deleteLogInfo);

router.post("/signin", signin);
router.put("/preferences/:service", updateServicePreference);

module.exports = router;
