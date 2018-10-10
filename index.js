
const express = require("express");

const logger = require("./logger");
const genres = require("./api/genres");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/genres", genres);


let port = process.env.PORT || 3000;
app.listen(port);