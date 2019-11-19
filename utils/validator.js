const jwt = require('jsonwebtoken');
const AppError = require('./AppError');
const catchHandler = require('./catchHandler');

exports.validate = catchHandler(async (req, res, next) => {
  jwt.verify(
    req.headers['x-access-token'],
    process.env.JWT_SECRET,
    (err, decode) => {
      if (err) return next(new AppError('Missing Validator', 400));
      req.body.userId = decode.id;
    }
  );
});
