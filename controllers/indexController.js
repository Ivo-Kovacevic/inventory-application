const db = require("../db/queries");

const homeGet = async (req, res) => {
    const topPicks = await db.getFiveMovies();
    res.render("index", { topPicks });
};

module.exports = {
    homeGet,
};
