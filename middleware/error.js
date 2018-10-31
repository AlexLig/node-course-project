const winston = require('winston')
module.exports = function (err, req, res, next) {
  // todo: log ex
  winston.error(err.message,err)
  res.status(500).send('Something went wrong')
}