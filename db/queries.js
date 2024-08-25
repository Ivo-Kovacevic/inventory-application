const pool = require("./pool");

const getAllGenres = async () => {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
};

const getAllMovies = async () => {
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
};

const getMovieInfo = async (movieTitle) => {
    const { rows } = await pool.query("SELECT * FROM movies WHERE title = $1", [
        movieTitle,
    ]);
    const [movieInfo] = rows;
    return movieInfo;
};

const getMovieGenre = async (genreName) => {
    const { rows } = await pool.query(
        `SELECT movies.title, movies.path FROM movies
        INNER JOIN movie_genres ON movies.id = movie_genres.movie_id
        INNER JOIN genres ON genres.id = movie_genres.genre_id
        WHERE genres.name = $1`,
        [genreName]
    );
    return rows;
};

module.exports = {
    getAllGenres,
    getAllMovies,
    getMovieInfo,
    getMovieGenre,
};
