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
    res.render("newMovie");
};

const newMoviePost = async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    await db.addNewMovie(newMovie);
    res.redirect(`/movies/movie/${newMovie.title}`);
}

module.exports = {
    moviesGet,
    movieGet,
    newMovieGet,
    newMoviePost,
};
