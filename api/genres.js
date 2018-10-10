const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
}));

// async function getGenre(genreName){
//   return await Genre.find({genre: genreName})
// }
// async function updateGenre(genreName, newName){
//   const genre = await Genre.find({genreName});
//   if(!genre) throw new Error('404')
//   // @ts-ignore
//   genre.set({name: newName})
//   // @ts-ignore
//   genre.save();
// }
// async function deleteGenre(genreName){
//   const result = await Genre.deleteOne({genre: genreName});
// }
// async function getGenres(){
//   return await Genre.find({})
// }
// async function createGenre(genreName){
//   const genre = new Genre({
//     genre: genreName
//   })
//   try{
//     const result = await genre.save();
//     return result;
//   }
//   catch(ex){
//     return ex;
//   }
// }

const router = express.Router();

function genreRequestValidation(body) {
  const schema = {
    genre: Joi.string().min(3).required()
  };
  return Joi.validate(body, schema);
}

router.route("/")
  .get(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  })
  .post(async (req, res) => {
    const validation = genreRequestValidation(req.body);

    if (validation.error) {
      return res
        .status(400)
        .send(`400 bad request. ${validation.error.details[0].message}`);
    }

    let genre = new Genre({
      name: req.body.genre
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
    const validation = genreRequestValidation(req.body);

    if (validation.error) {
      return res.status(400).send(`400 bad request. ${validation.error.details[0].message}`);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, {
      new: true
    })

    if (!genre) {
      return res.status(404).send(`${req.body.genre} genre was not found`);
    }

    res.send(genre);
  })
  .delete(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
      return res.status(404).send(`404 . ${req.params.genre} genre was not found`);
    }

    res.send(genre);
  });


module.exports = router;