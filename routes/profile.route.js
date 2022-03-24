const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;
