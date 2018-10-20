const express = require('express');
const {Genre, validate} = require('../models/genre')

const router = express.Router();

router.route("/")
  .get(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  })
  .post(async (req, res) => {
    const { error } = validate(req.body)

    if ( error) {
      return res
        .status(400)
        .send(error.details[0].message);
    }

    let genre = new Genre({
      name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
  });

router.route("/:id")
  .get(async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).send("Genre Not Found!");
    }

    res.send(genre);
  })
  .put(async (req, res) => {
    const {error} = validate(req.body);

    if (error) {
      return res.status(400).send(`400 bad request. ${error.details[0].message}`);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, {
      new: true
    })

    if (!genre) {
      return res.status(404).send(`Genre with the given id was not found`);
    }

    res.send(genre);
  })
  .delete(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
      return res.status(404).send(`404 genre was not found`);
    }

    res.send(genre);
  });


module.exports = router;