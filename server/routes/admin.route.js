const router = require("express").Router();

const {
  retrieveLogInfo,
  deleteLogInfo,
  signin,
  updateServicePreference,
  retrieveServicePreference,
} = require("../controllers/admin.controller");

const requireAdminAuth = require("../middlewares/auth/adminAuth");
const {
  configLimiter,
  logLimiter,
  signUpSignInLimiter,
} = require("../middlewares/limiter/limiter");

router.post("/signin", signUpSignInLimiter, signin);

router.use(requireAdminAuth);

router
  .route("/preferences")
  .get(configLimiter, retrieveServicePreference)
  .put(configLimiter, updateServicePreference);
router
  .route("/logs")
  .get(logLimiter, retrieveLogInfo)
  .delete(logLimiter, deleteLogInfo);

module.exports = router;
