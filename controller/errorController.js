const AppError = require('../utils/AppError');

const handleCastErrorDB = err => {
  // Here we declare a message with the path and and the value
  const msg = `Invalid ${err.path}: ${err.value}`;
  // then return the AppError class
  return new AppError(msg, 400);
};

const handleDuplicateErrorDB = err => {
  // This REGEX takes the argument where the duplicate name is
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // Passing a message to the client
  const msg = `Duplicate tour value: ${value}. Try again to another name`;
  // Calling the AppError class
  return new AppError(msg, 400);
};

const handleValidationErrorDB = err => {
  // Mappging through the array of validation errors and taking its messages
  const errors = Object.values(err.errors).map(e => e.message);
  // Passing a message to the client with the errors joining them by the period
  const msg = `Invalid input data: ${errors.join('. ')}`;
  // Calling the AppError class
  return new AppError(msg, 400);
};

// Setting errors in development enviroment
const sendErrorDev = (err, res) => {
  // It should return all the error information to help the developer
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack
  });
};

// Sending to the client just the operatoinal errors that we trust
const sendErrorProd = (err, res) => {
  // Operational error we trusted
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  else {
    // if it isn't an operational error that we trust we return to the client an generic error
    global.console.log('ERROR ===> ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    });
  }
};

// Setting the middleware to send the errors
module.exports = (err, req, res, next) => {
  // This err is a default param of express
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Error';

  // Checking if the error is in development if true call the method to send errors to dev
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  //checking if the error is in prod if true call the method to send errors to prod
  else if (process.env.NODE_ENV === 'production') {
    // Declaring the error var to no change the err param
    let error = { ...err };
    // checking if it's a cast error, if true call the method to handle it
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    // checking if it's a duplicate mongo error, if true call the method to handle it
    if (err.code === 11000) error = handleDuplicateErrorDB(err);
    // checking if it's a validation error if true call the method to handle it
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    // sending the errors to production
    sendErrorProd(error, res);
  }
};
