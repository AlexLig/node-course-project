const Joi = require('joi')
const mongoose = require('mongoose')
// customer schema
const customerSchema = new mongoose.Schema({
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
})
// mongoose model
const Customer = mongoose.model('Customer', customerSchema)
// request.body validation and schema with Joi
function validateCustomer(body) {
  const schema = {
    isGold: Joi.boolean().default(false),
    name: Joi.string().required(),
    phone: Joi.string().required()
  }
  return Joi.validate(body, schema)
}
exports.Customer = Customer
exports.validate = validateCustomer
exports.customerSchema = customerSchema