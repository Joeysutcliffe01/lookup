const router = require("express").Router();
const MovieCollection = require("../models/movieCollection.model");

router.post("/create", async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.session.user.username);

  await MovieCollection.updateOne({ owner: req.session.user.username });
  res.redirect("/profile");
});

module.exports = router;
