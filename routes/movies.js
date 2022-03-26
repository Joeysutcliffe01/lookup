const express = require("express");
const router = express.Router();
const axios = require("axios");
const { requireLogin } = require("../middlewares/route-guard");

const API_KEY = "api_key=e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

router.get("/movies", requireLogin, async (req, res, next) => {
  const urlPopularMovies = await axios.get(
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
  );
  const urlTopRatedMovies = await axios.get(
    BASE_URL +
      "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-01-24&" +
      API_KEY
  );
  const urlKidsMovies = await axios.get(
    BASE_URL +
      "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&" +
      API_KEY
  );

  const popularMovies = urlPopularMovies.data.results;
  const topRatedMovies = urlTopRatedMovies.data.results;
  const kidsMovies = urlKidsMovies.data.results;

  const moviesGroup = {
    popular: popularMovies,
    topRated: topRatedMovies,
    kids: kidsMovies,
  };

  res.render("movies", { moviesGroup, user: req.session.user });
});

router.get("/details/:id", async (req, res, next) => {
  console.log(req.params, "params here");
  const { id } = req.params;

  res.render("details");
});

module.exports = router;
