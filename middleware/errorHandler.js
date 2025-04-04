const errorHandler = (err, next, req, res) => {
  console.log(err.stack);
  res.status(400).json({ message: err.message });
};

module.exports = errorHandler;
