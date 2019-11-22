class AppError extends Error {
  constructor(message, statusCode) {
    // Passing to the parent class the message itself
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    // Returning the error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
