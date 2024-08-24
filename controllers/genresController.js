const db = require("../db/queries");

const genresGet = async (req, res) => {
    const genres = await db.getAllGenres();
    res.render("genres", { genres });
};

const genreGet = async (req, res) => {
    const genreName = decodeURIComponent(req.params.genre);
    const movieGenre = await db.getMovieGenre(genreName);
    console.log(movieGenre);
}

module.exports = {
    genresGet,
    genreGet,
};
