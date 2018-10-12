const express = require('express');
const Joi = require('joi')
const mongoose = require('mongoose')

const router = express.Router();

// mongoose model
const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  }

}))
// request.body validation and schema with Joi
function validateCustomer(body) {
  const schema = {
    isGold: Joi.boolean().default(false),
    name: Joi.string().required(),
    phone: Joi.string().required()
  }
  return Joi.validate(body, schema)
}

// End Points
router.route('/')
  .get(async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
  })
  .post(async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error){ 
      return res.status(400).send(error.details[0].message)
    }

    let customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    })
    customer = await customer.save()
    res.send(customer)
  })
router.route('/:id')
  .get(async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) res.status(404).send('Customer with given Id was not found')
    res.send(customer)
  })
  .put(async (req, res) => {
    const { error } = validateCustomer(req.body)
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
  .delete(async (req, res) => {
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