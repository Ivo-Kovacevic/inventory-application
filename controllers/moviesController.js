const db = require("../db/queries");

const moviesGet = async (req, res) => {
    const movies = await db.getAllMovies();
    res.render("movies", { movies });
};

module.exports = {
    moviesGet,
};
