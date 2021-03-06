const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require('./genre')
// movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}
)
// Movie model
const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie){
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    // @ts-ignore
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  }
  return Joi.validate(movie, schema)
}

exports.Movie = Movie
exports.validate = validateMovie
exports.movieSchema = movieSchema