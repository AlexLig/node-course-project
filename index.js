const mongoose = require('mongoose');
const express = require('express');

const genres = require('./api/genres');
const customers = require('./api/customers')

const app = express();
mongoose.connect('mongodb://localhost/videoClub', {
    useNewUrlParser: true
  })
  .then(() => console.log('\n Connected to MongoDB \n'))
  .catch(() => console.error('\n Could NOT connect to MongoDB \n'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customers);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\n Listening to PORT:${port}`));