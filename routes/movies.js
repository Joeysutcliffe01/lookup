const express = require("express");
const router = express.Router();
const axios = require("axios");
//const {requireLogin} = require("../middlewares/route-guard")

const API_KEY = "api_key=e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

//router.use(requireLogin)
router.get("/movies", async (req, res, next) => {
  try {
    const topMovieRated = await axios.get(API_URL);
    const movies = topMovieRated.data.results;

    console.log(topMovieRated.data.results, "topmovies");
    res.render("movies", { movies });
  } catch (err) {
    console.log("err", err);
    res.render("movies");
  }
});

router.get("/details/:id", async (req, res, next) => {
  console.log(req.params, "params here");
  const { id } = req.params;

  res.render("details");
});
//----------------------------------WORKS

// router.get("/shows", async (req, res, next) => {
//   try {
//     const topMovieRated = await axios.get(API_URL);

//     console.log("this is the data", topMovieRated.data.);

//     res.render("shows");
//   } catch (err) {
//     console.log("err", err);
//     console.log("this is the data", topMovieRated.data);
//     res.render("shows");
//   }
// });

//----------------------------------WORKS

module.exports = router;
