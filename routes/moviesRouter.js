const { Router } = require("express");
const moviesRouter = Router();
const moviesController = require("../controllers/moviesController");

moviesRouter.get("/movie/new", moviesController.newMovieGet);
moviesRouter.post("/movie/new", moviesController.newMoviePost);

moviesRouter.get("/movie/:name/update", moviesController.updateMovieGet);
moviesRouter.post("/movie/:name/update", moviesController.updateMoviePost);

moviesRouter.get("/movie/:name/delete", moviesController.deleteMovieGet);

moviesRouter.get("/movie/:name", moviesController.movieGet);
moviesRouter.get("/", moviesController.moviesGet);

module.exports = moviesRouter;
