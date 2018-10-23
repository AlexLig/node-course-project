const mongoose = require('mongoose')
const Joi = require('joi')
const User = mongoose.model("User", new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 1024,
    required: true
  }
}))
function validateUser(user){
 const schema = {
   name: Joi
    .string()
    .required()
    .min(2)
    .max(255),
  email: Joi
    .string()
    .required()
    .email()
    .min(5)
    .max(255),
  password: Joi
    .string()
    .min(5)
    .max(255)
    .required()
 }
 return Joi.validate(user, schema)
}
exports.validate = validateUser
exports.User = User