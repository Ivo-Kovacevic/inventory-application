const db = require("../db/queries");

const homeGet = async (req, res) => {
    const topPicks = await db.getFiveMovies();
    console.log(topPicks);
    res.render("index", { topPicks });
};

module.exports = {
    homeGet,
};
