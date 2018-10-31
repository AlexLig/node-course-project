
module.exports = (err, req, res, next) => {
  // todo: log ex
  res.status(500).send('Something went wrong')
}