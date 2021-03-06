const winston = require('winston')
const express = require('express');
const app = express()

require('./startup/loggin')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

let port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening to PORT:${port}`)); 