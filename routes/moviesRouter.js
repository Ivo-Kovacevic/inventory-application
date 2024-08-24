const { Router } = require("express");
const moviesRouter = Router();
const moviesController = require("../controllers/moviesController");

moviesRouter.get("/movie/:title", moviesController.movieGet);
moviesRouter.get("/", moviesController.moviesGet);

module.exports = moviesRouter;
