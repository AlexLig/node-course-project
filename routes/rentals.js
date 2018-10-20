const express = require('express')
const { Rental, validate } = require('../models/rental')
const { Customer } = require('../models/customer')
const { Movie } =require('../models/movie')
const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const rentals = await Rental.find().sort('rentDate')
    res.send(rentals)
  })
  .post(async (req, res) => {
    const { error } = validate( req.body )
    if (error){
      return res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findById( req.body.customerId)
    if (!customer){
      return res.status(404).send('customer with given id was not found')
    }
    const movie = await Movie.findById( req.body.movieId)
    if (!movie){
      return res.status(404).send('movie with given id was not found')
    }

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        genre: movie.genre,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      },
      returnDate: null
    })

    rental = await rental.save()
    res.send(rental)
  })

router.route('/:id')
  .get(async (req, res) => {
    const rental = await Rental.findById(req.params.id)
    if ( !rental){
      return res.status(404).send('Rental with given id was not found')
    }
    res.send(rental)
  })
  .put(async (req, res) => {
    const { error } = validate(req.body)
    if( error ){
      return res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findById( req.body.customerId)
    if (!customer){
      return res.status(404).send('customer with given id was not found')
    }
    const movie = await Movie.findById( req.body.movieId)
    if (!movie){
      return res.status(404).send('movie with given id was not found')
    }
    const rentalUpdated = {
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        genre: movie.genre,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      },
      returnDate: req.body.returnDate
    }
    let rental = await Rental.findByIdAndUpdate(req.params.id, rentalUpdated, {new: true})
    if(!rental){
      return res.status(404).send('rental with given id was not found')
    }
    res.send(rental)
  })
  .delete(async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id)
    if(!rental){
      return res.status(404).send('Rental with given id was not found')
    }
    res.send(rental)
  })

  module.exports = router