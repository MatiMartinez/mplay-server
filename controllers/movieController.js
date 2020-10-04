const Movie = require("../models/Movie");

exports.createMovie = async (req, res) => {
  try {
    // Check if movie already exist
    let movieSearch = await Movie.findOne({
      name: req.body.name,
    });
    if (movieSearch && movieSearch.user.toString() === req.user.id) {
      return res.status(404).json({ msg: "Movie already exist" });
    }

    let movie = new Movie(req.body);
    movie.user = req.user.id;
    await movie.save();
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to create movie" });
  }
};

exports.getMovies = async (req, res) => {
  try {
    let movies = await Movie.find({ user: req.user.id });
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error on get movies" });
  }
};

exports.getMoviesNotViewedByUser = async (req, res) => {
  try {
    let movies = await Movie.find({ user: req.user.id, viewed: false });
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error on get movies" });
  }
};

exports.getMoviesViewedByUser = async (req, res) => {
  try {
    let movies = await Movie.find({ user: req.user.id, viewed: true });
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error on get movies" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    // Check if movie exist
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send({ msg: "Movie doesn´t exist" });
    }

    // Check user creator
    if (movie.user.toString() !== req.user.id) {
      res.status(401).send({ msg: "No authorization" });
    }

    await Movie.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Movie deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error on delete movie" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movieExist = await Movie.findById(req.params.id);

    if (!movieExist) {
      return res.status(404).json({ msg: "Movie doesn´t exist" });
    }

    if (movieExist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No authorization" });
    }

    await Movie.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Movie deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error on delete movie" });
  }
};

exports.toggleViewed = async (req, res) => {
  try {
    const movieExist = await Movie.findById(req.params.id);

    if (!movieExist) {
      return res.status(404).json({ msg: "Movie doesn´t exist" });
    }

    if (movieExist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No authorization" });
    }

    let movie = await Movie.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          viewed: !movieExist.viewed,
        },
      },
      { new: true }
    );

    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error on toggle score" });
  }
};
