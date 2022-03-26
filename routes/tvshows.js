const express = require("express");
const router = express.Router();
const axios = require("axios");
const { requireLogin } = require("../middlewares/route-guard");
let use;

const API_KEY = "api_key=e0fad87e668f0db69d0dd676c05d8fc1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_KEY;

router.get("/tvshows", requireLogin, async (req, res, next) => {
  const urlPopularTv = await axios.get(
    BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_KEY
  );
  const urlTopRated = await axios.get(BASE_URL + "/tv/top_rated?" + API_KEY);
  const urlTrending = await axios.get(
    BASE_URL + "/trending/tv/week?" + API_KEY
  );

  const popularTv = urlPopularTv.data.results;
  const topRated = urlTopRated.data.results;
  const trending = urlTrending.data.results;

  const tvgroup = {
    popularTv: popularTv,
    topRatedTv: topRated,
    trendingTv: trending,
  };

  console.log(tvgroup.trendingTv);

  res.render("tvshows", { tvgroup, user: req.session.user });
});

// router.get("/details/:id", async (req, res, next) => {
//   console.log(req.params, "params here");
//   const { id } = req.params;

//   res.render("details");
// });

module.exports = router;
