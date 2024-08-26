const db = require("../db/queries");

const moviesGet = async (req, res) => {
    const movies = await db.getAllMovies();
    res.render("movies", { movies });
};

const movieGet = async (req, res) => {
    const movieTitle = decodeURIComponent(req.params.title);
    const movie = await db.getMovieInfo(movieTitle);
    const genres = await db.getMovieGenres(movieTitle);
    res.render("movie", { movie, genres });
};

const newMovieGet = async (req, res) => {
    const query = req.query;
    console.log(query);
    res.render("newMovie");
};

module.exports = {
    moviesGet,
    movieGet,
    newMovieGet,
};
