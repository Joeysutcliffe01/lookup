const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "api_key=e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=e0fad87e668f0db69d0dd676c05d8fc1&query="';
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

//router.use(requireLogin)
router.get("/search", (req, res, next) => {
  res.render("search");
});

module.exports = router;
