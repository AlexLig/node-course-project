const mongoose = require('mongoose');
const express = require("express");

const logger = require("./logger");
const genres = require("./api/genres");

const app = express();
mongoose.connect("mongodb://localhost/videoClub")
  .then(() => console.log('\n Connected to MongoDB \n'))
  .catch(() => console.error('\n Could NOT connect to MongoDB \n'));

app.use(express.json());
app.use(logger);
app.use("/api/genres", genres);


let port = process.env.PORT || 3000;
app.listen(port);