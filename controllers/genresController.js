const db = require("../db/queries");

const genresGet = async (req, res) => {
    const genres = await db.getAllGenres();
    res.render("genres", { genres });
};

module.exports = {
    genresGet,
};
