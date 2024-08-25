const db = require("../db/queries");

const moviesGet = async (req, res) => {
    const movies = await db.getAllMovies();
    res.render("movies", { movies });
};

const movieGet = async (req, res) => {
    const movieTitle = decodeURIComponent(req.params.title);
    const movie = await db.getMovieInfo(movieTitle);
    const genres = await db.getMovieGenres(movieTitle);
    console.log(genres);
    res.render("movie", { movie, genres });
};

module.exports = {
    moviesGet,
    movieGet,
};
