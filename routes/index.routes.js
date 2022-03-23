const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "api_key=e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

/* GET home page */
router.get("/", async (req, res) => {
  try {
    const topMovieRated = await axios.get(API_URL);
    const tvshows = topMovieRated.data.results;

    console.log(topMovieRated.data.results, "toptvshows");
    res.render("index", { tvshows });
  } catch (err) {
    console.log("err", err);
    res.render("index");
  }
});

module.exports = router;
