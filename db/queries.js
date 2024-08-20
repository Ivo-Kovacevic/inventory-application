const pool = require("./pool");

const getAllGenres = async () => {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
};

const getAllMovies = async () => {
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
};

module.exports = {
    getAllGenres,
    getAllMovies,
};
