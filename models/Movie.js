const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
  image_path: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
