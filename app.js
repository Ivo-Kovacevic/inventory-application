require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const genresRouter = require("./routes/genresRouter");
const moviesRouter = require("./routes/moviesRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/genres", genresRouter);
app.use("/movies", moviesRouter);
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`App is live at port ${PORT}`));
