const express = require("express");
const path = require("path");

const router = express.Router();

router.get("^(/|/index(.html)?)$", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "index.html"));
});

router.get("^/new-page(.html)?$", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "new-page.html"));
});

// This would redirect to /Users/daee/personal/express-auth-api/views/new-page.html
// It works fine if the regex is ^/old-page.
// Why?
router.get("^/old-page.html", (req, res) => {
  res.redirect("/new-page");
});

module.exports = router;
