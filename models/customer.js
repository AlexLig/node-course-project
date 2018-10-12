const Joi = require('joi')
const mongoose = require('mongoose')
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
exports.Customer = Customer
exports.validate = validateCustomer