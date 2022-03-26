const express = require("express");
const router = express.Router();
const axios = require("axios");
const { requireLogin } = require("../middlewares/route-guard");
const MovieCollection = require("../models/movieCollection.model");

const API_KEY = "e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3/search/movie?";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

router.get("/profile", requireLogin, async (req, res) => {
  const collection = await MovieCollection.findOne({
    owner: req.session.user.username,
  });

  res.render("profile", {
    movies: collection.moviesCol,
    user: req.session.user,
  });
});

router.post("/addMovie", requireLogin, async (req, res) => {
  if (!req.body.movieName) {
    return res.redirect("profile");
  }
  try {
    const search = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
          query: req.body.movieName,
          include_adult: false,
        },
      }
    );

    const collection = await MovieCollection.findOne({
      owner: req.session.user.username,
    });

    const movie = {
      id: search.data.results[0].id,
      original_title: search.data.results[0].original_title,
      poster_path: search.data.results[0].poster_path,
      vote_average: search.data.results[0].vote_average,
      // overview: search.data.results[0].overview,
    };

    const doesEx = collection.moviesCol.find(
      (currentMovie) => currentMovie.id === movie.id
    );
    if (!doesEx) {
      collection.moviesCol.push(movie);
      await collection.save();
    }
    res.redirect("profile", { user: req.session.user });
  } catch (err) {
    console.log(err, "this is an error");
    res.redirect("profile", { user: req.session.user });
  }
});

module.exports = router;
