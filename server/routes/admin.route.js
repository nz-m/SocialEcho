const router = require("express").Router();

const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
  updateServicePreference,
  retrieveServicePreference,
} = require("../controllers/admin.controller");

const requireAdminAuth = require("../middlewares/auth/adminAuth");

router.post("/signin", signin);

router.use(requireAdminAuth);

router
  .route("/preferences")
  .get(retrieveServicePreference)
  .put(updateServicePreference);

router.route("/logs").get(retrieveLogInfo).delete(deleteLogInfo);

module.exports = router;
