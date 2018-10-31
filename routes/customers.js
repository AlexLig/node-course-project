const express = require('express');
const { Customer, validate} = require('../models/customer')

const router = express.Router();
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

// End Points
router.route('/')
  .get(async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
  })
  .post(auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error){ 
      return res.status(400).send(error.details[0].message)
    }

    const customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    })
    await customer.save()
    res.send(customer)
  })
router.route('/:id')
  .get(async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) res.status(404).send('Customer with given Id was not found')
    res.send(customer)
  })
  .put(auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
      return (
        res
          .status(400)
          .send(`400 bad request: ${error.details[0].message}`)
      )
    }
    const customer = await Customer
      .findByIdAndUpdate(req.params.id, {
        isGold: req.body.idGold,
        name: req.body.name,
        phone: req.body.phone
    },{
      new: true
    })
    if(!customer){
      return ( 
        res
          .status(404)
          .send('Customer with given id was not found')
      )
    }
    res.send(customer)
  })
  .delete([auth, isAdmin], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer){
      return(
        res
          .status(404)
          .send('customer with the given id was not found')
      )
    }
    res.send(customer)
  })

  module.exports = router