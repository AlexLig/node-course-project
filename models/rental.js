const mongoose = require('mongoose')
const Joi = require('joi')
const { customerSchema } = require('./customer')
const { movieSchema } = require('./movie')

// rental model
const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    // we are creating a new customer schema so we can include only the essential properties instead of all customer document properties
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }

    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
}))

// Joi validation
function validateRental(rental){
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  }
  return Joi.validate(rental, schema)
}
exports.validate = validateRental
exports.Rental = Rental