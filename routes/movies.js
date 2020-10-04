const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
  movieController.createMovie(req, res);
});

router.get("/", auth, (req, res) => {
  movieController.getMovies(req, res);
});

router.get("/not-viewed-by-user", auth, (req, res) => {
  movieController.getMoviesNotViewedByUser(req, res);
});

router.get("/viewed-by-user", auth, (req, res) => {
  movieController.getMoviesViewedByUser(req, res);
});

router.delete("/:id", auth, (req, res) => {
  movieController.deleteMovie(req, res);
});

router.put("/:id", auth, (req, res) => {
  movieController.toggleViewed(req, res);
});

module.exports = router;
