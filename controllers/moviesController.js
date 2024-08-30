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
        await db.addNewMovie(newMovie);
        res.redirect(`/movies/movie/${newMovie.name}`);
    },
];

const updateMovieGet = async (req, res) => {
    const movieName = decodeURIComponent(req.params.name);
    const movie = await db.getMovieInfo(movieName);
    movie.genres = await db.getMovieGenres(movieName);
    res.render("updateMovie", { movie });
};

const updateMoviePost = [
    validateNewMovie,
    async (req, res) => {
        const errors = validationResult(req);
        const movieForm = genresToArray(req.body);
        console.log(movieForm);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateMovie", {
                inputedMovieForm: movieForm,
                errors: errors.array(),
            });
        }
        await db.updateMovie(movieForm);
        res.redirect(`/movies/movie/${movieForm.name}`);
    },
];

module.exports = {
    moviesGet,
    movieGet,
    newMovieGet,
    newMoviePost,
    updateMovieGet,
    updateMoviePost,
};
