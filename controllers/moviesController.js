const db = require("../db/queries");

const moviesGet = async (req, res) => {
    const movies = await db.getAllMovies();
    res.render("movies", { movies });
};

const movieGet = async (req, res) => {
    const movieName = decodeURIComponent(req.params.name);
    const movie = await db.getMovieInfo(movieName);
    const genres = await db.getMovieGenres(movieName);
    res.render("movie", { movie, genres });
};

const newMovieGet = async (req, res) => {
    res.render("newMovie");
};

const newMoviePost = async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    await db.addNewMovie(newMovie);
    res.redirect(`/movies/movie/${newMovie.name}`);
}

module.exports = {
    moviesGet,
    movieGet,
    newMovieGet,
    newMoviePost,
};
