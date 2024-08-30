const db = require("../db/queries");
const { validationResult } = require("express-validator");
const { validateNewMovie } = require("../validation/new-movie-validation");

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

const genresToArray = (movieInfo) => {
    if (!Array.isArray(movieInfo.genres)) {
        movieInfo.genres = [movieInfo.genres];
    }
    return movieInfo;
};

const newMoviePost = [
    validateNewMovie,
    async (req, res) => {
        const errors = validationResult(req);
        const newMovie = genresToArray(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).render("newMovie", {
                inputedMovieForm: newMovie,
                errors: errors.array(),
            });
        }
        console.log(newMovie);
        await db.addNewMovie(newMovie);
        res.redirect(`/movies/movie/${newMovie.name}`);
    },
];

module.exports = {
    moviesGet,
    movieGet,
    newMovieGet,
    newMoviePost,
};
