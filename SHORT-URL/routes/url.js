const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

// Handle URL shortening
router.post("/", handleGenerateNewShortURL);

// Handle analytics
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
