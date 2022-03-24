const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "api_key=e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

router.get("/", async (req, res, next) => {
  const urlPopularTv = await axios.get(
    BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_KEY
  );

  const urlMoviesTv = await axios.get(
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
  );

  const popularMovies = urlMoviesTv.data.results;
  const tvshows = urlPopularTv.data.results;

  const moviesAndTv = {
    movies: popularMovies,
    tv: tvshows,
  };

  res.render("index", { moviesAndTv });
});

module.exports = router;
