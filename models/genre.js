const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
}));

function validateGenre(body) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(body, schema);
}

exports.Genre = Genre
exports.validate = validateGenre