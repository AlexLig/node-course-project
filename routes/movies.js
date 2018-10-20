const express = require('express')
const { Movie, validate} = require('../models/movie')
const { Genre } = require('../models/genre')
const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const movies = await Movie.find().sort('title')
    res.send(movies)
  })
  .post(async (req, res) => {
    const { error } = validate(req.body)
    if (error){
      return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId)
    if(!genre){
      return res.status(404).send('Invalid genre.')
    } 

    let movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    })
    movie = await movie.save()
    res.send(movie)
  })
  
router.route('/:id')
  .get(async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie){
      return res.status(404).send('Movie with the given id was not found')
    }
    res.send(movie)
  })
  .put(async (req, res) => {
    const { error } = validate(req.body)
    if (error){
      return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId)
    if(!genre){
      return res.status(400).send('Invalid genre.')
    } 
    const movieUpdated = {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }

    let movie = await Movie.findByIdAndUpdate(req.params.id, movieUpdated, {new: true})

    if(!movie){
      return res.status(404).send('Movie with the given id was not found')
    }
    res.send(movie)
  })
  .delete(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if(!movie){
      return res.status(404).send('Movie with the given Id was not found')
    }
    res.send(movie)

  })
  module.exports = router