const config = require('config')
const mongoose = require('mongoose');
const express = require('express');

const Joi = require('joi')
// @ts-ignore
Joi.objectId = require('joi-objectid')(Joi)

const genres = require('./routes/genres');
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const error = require('./middleware/error')



const app = express();
if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1)
}
mongoose.connect('mongodb://localhost/videoClub', {
    useNewUrlParser: true
  })
  .then(() => console.log('\n Connected to MongoDB \n'))
  .catch(() => console.error('\n Could NOT connect to MongoDB \n'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies)
app.use('/api/rentals',rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

app.use(error)

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\n Listening to PORT:${port}`)); 