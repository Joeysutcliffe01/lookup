const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/details/:media_type/:id", (req, res) => {
  const { id } = req.params;
  const mediaType = req.params.media_type;
  console.log(mediaType);
  console.log(d);
  let key;

  axios
    .get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${APIKEY}`)
    .then((response) => {
      ListModel.findOne({ userId: req.session.loggedInUser._id }).then(
        (listResponse) => {
          const mediaInfo = response.data;
          if (listResponse) {
            const moviesArray = JSON.parse(
              JSON.stringify(listResponse.arrayMedia)
            );
            const moviesIDArray = [];
            for (const obj of moviesArray) {
              moviesIDArray.push(obj.id);
            }
            if (moviesIDArray.includes(id)) {
              mediaInfo.isMovieAdded = true;
            } else {
              mediaInfo.isMovieAdded = false;
            }
          }
          res.render("details.hbs");
        }
      );
    });
});
