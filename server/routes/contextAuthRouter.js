const express = require("express");
const router = express.Router();
const useragent = require("express-useragent");

const {
  getContextData,
  addContextData,
} = require("../controllers/authController");

router.use(useragent.express());

router.get("/:id", getContextData);
router.post("/", addContextData);

router.get;

module.exports = router;
