const db = require("../db/queries");

const genresGet = async (req, res) => {
    const genres = await db.getAllGenres();
    res.render("genres", { genres });
};

const genreGet = async (req, res) => {
    const genreName = decodeURIComponent(req.params.genre);
    const movies = await db.getGenre(genreName);
    console.log(movies);
    res.render("genre", { genreName, movies });
}

module.exports = {
    genresGet,
    genreGet,
};
