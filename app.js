require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`App is live at port ${PORT}`));
