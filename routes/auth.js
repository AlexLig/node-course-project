const express = require('express')
const { User} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const router = express.Router()
const Joi = require('joi')
const jwt = require('jsonwebtoken')

// End Points
router.route('/')
  .post(async (req, res) => {
    const { error } = validate(req.body)
    if (error){ 
      return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email})
    if(!user){
      return res.status(400).send('Invalid email or password')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
      return res.status(400).send('Invalid email or password')
    }
    const token = jwt.sign({_id: user._id}, 'jwtPrivateKey') // hardCoded private key for demonstration. NEVER store secret on source code
    res.send(token)
  })

  function validate(user){
    const schema = {
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
  module.exports = router