const pool = require("./pool");

const getAllGenres = async () => {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
};

const getAllMovies = async () => {
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
};

const getMovieInfo = async (movieName) => {
    const { rows } = await pool.query("SELECT * FROM movies WHERE name = $1", [
        movieName,
    ]);
    const [movieInfo] = rows;
    return movieInfo;
};

const getGenre = async (genreName) => {
    const { rows } = await pool.query(
        `SELECT movies.name, movies.path FROM movies
        INNER JOIN movie_genres ON movies.id = movie_genres.movie_id
        INNER JOIN genres ON genres.id = movie_genres.genre_id
        WHERE genres.name = $1`,
        [genreName]
    );
    return rows;
};

const getMovieGenres = async (movieName) => {
    const { rows } = await pool.query(
        `SELECT genres.name FROM genres
        INNER JOIN movie_genres ON genres.id = movie_genres.genre_id
        INNER JOIN movies ON movies.id = movie_genres.movie_id
        WHERE movies.name = $1`,
        [movieName]
    );
    return rows;
};

const getFiveMovies = async () => {
    const { rows } = await pool.query(
        `SELECT movies.name, movies.path FROM movies LIMIT 5`
    );
    return rows;
};

const addNewMovie = async (newMovie) => {
    const name = newMovie.name;
    const releaseYear = newMovie.year;
    const rating = parseFloat(newMovie.rating);
    const description = newMovie.description;

    await pool.query(`INSERT INTO movies (name, release_year, rating, description, path)
                    VALUES ($1, $2, $3, $4, '/movie-images/inception.jpg')`,
                    [name, releaseYear, rating, description]
    );


    const genres = newMovie.genres;

    const { rows } = await pool.query(`SELECT id FROM movies WHERE name = $1`, [name]);
    const movie_id = rows[0].id;

    for (let genre of genres) {
        let genreResult = await pool.query(`SELECT id FROM genres WHERE name = $1`, [genre]);
        const genre_id = genreResult.rows[0].id;
        await pool.query(`INSERT INTO movie_genres (movie_id, genre_id)
                        VALUES ($1, $2)`,
                        [movie_id, genre_id]);
    }
}

module.exports = {
    getAllGenres,
    getAllMovies,
    getMovieInfo,
    getGenre,
    getMovieGenres,
    getFiveMovies,
    addNewMovie,
};
