const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Varsayılan 500 (Internal Server Error)
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Bir şeyler ters gitti.',
  });
};

module.exports = errorHandler;
