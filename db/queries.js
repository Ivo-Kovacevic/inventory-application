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

const getGenre = async (genreName) => {
    const { rows } = await pool.query(
        `SELECT movies.title, movies.path FROM movies
        INNER JOIN movie_genres ON movies.id = movie_genres.movie_id
        INNER JOIN genres ON genres.id = movie_genres.genre_id
        WHERE genres.name = $1`,
        [genreName]
    );
    return rows;
};

const getMovieGenres = async (movieTitle) => {
    const { rows } = await pool.query(
        `SELECT genres.name FROM genres
        INNER JOIN movie_genres ON genres.id = movie_genres.genre_id
        INNER JOIN movies ON movies.id = movie_genres.movie_id
        WHERE movies.title = $1`,
        [movieTitle]
    );
    return rows;
};

const getFiveMovies = async () => {
    const { rows } = await pool.query(
        `SELECT movies.title, movies.path FROM movies LIMIT 5`
    );
    console.log(rows);
    return rows;
};

module.exports = {
    getAllGenres,
    getAllMovies,
    getMovieInfo,
    getGenre,
    getMovieGenres,
    getFiveMovies,
};
