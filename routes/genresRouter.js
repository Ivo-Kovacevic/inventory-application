const { Router } = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/genre/:genre", genresController.genreGet);
genresRouter.get("/", genresController.genresGet);

module.exports = genresRouter;
