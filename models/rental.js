const mongoose = require('mongoose')
const Joi = require('joi')
const { customerSchema } = require('./customer')
const { movieSchema } = require('./movie')

// rental model
const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true
  },
  movie: {
    type: movieSchema,
    required: true
  },
  rentDate: {
    type: Date,
    default: Date.now()
  },
  returnDate: Date
}))

// Joi validation
function validateRental(rental){
  const schema = {
    customerId: Joi.string().min(2).max(255).required(),
    movieId: Joi.string().min(2).max(255).required()
  }
  return Joi.validate(rental, schema)
}
exports.validate = validateRental
exports.Rental = Rental