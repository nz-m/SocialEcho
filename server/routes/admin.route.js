const router = require("express").Router();
const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
  updateServicePreference,
  retrieveServicePreference,
} = require("../controllers/admin.controller");

router
  .route("/preferences")
  .get(retrieveServicePreference)
  .put(updateServicePreference);

router.route("/logs").get(retrieveLogInfo).delete(deleteLogInfo);

router.post("/signin", signin);

module.exports = router;
