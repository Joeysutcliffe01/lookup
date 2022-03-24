const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const dataShape = new Schema({
  owner: {
    type: String,
    required: true,
  },
  moviesCol: {
    type: [String],
    required: true,
  },
});

const options = {
  timestamp: true,
};

const moveCollectionSchema = new Schema(dataShape, options);

const MovieCollection = model("MovieCollection", moveCollectionSchema);

module.exports = MovieCollection;
