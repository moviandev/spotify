const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const catchHandler = require('../utils/catchHandler');
const AppError = require('../utils/AppError');

// Signup method and auto creates its token
exports.signup = catchHandler(async (req, res, next) => {
  // Creating users
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    confirmPass: req.body.confirmPass,
    role: req.body.role || 'user'
  });

  // setting token to the user
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES
    }
  );

  res.status(201).json({
    status: 'created',
    token,
    user
  });
});

// Login method and check if the jwt was valid
exports.login = catchHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user passed an email and password
  if (!email || !password)
    return next(new AppError('Please provide a valid email and password', 400));

  // Check if the email and password is correct
  const user = await User.findOne({ email }).select('+password');

  // Comparing passwords
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError(`Email or password does not exist`, 401));

  // Return user;
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES
    }
  );

  res.status(200).json({
    status: 'Logged',
    token,
    user
  });
});

// Validate JWT
exports.protected = catchHandler(async (req, res, next) => {
  let token;

  // Checking if it has a authorization header
  if (req.headers.authorization && req.authorization.startsWith('Bearer'))
    token = req.authorization.split(' ')[1];

  // Checking if the token exists
  if (!token)
    return next(
      new AppError(`You are not logged in! Please do login and try again`, 401)
    );

  // Getting the token
  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Saving the user by the id in the token
  const currentUser = await User.findOne(decoded.id);

  // CHecking if the user belongs to that token
  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to that token does not exist anymore',
        401
      )
    );

  // Checking if the password has been changed in that token
  if (currentUser.checkIfThePasswordHasBeenChanged(decoded.iat))
    return next(
      new AppError('Password recently changed, Please do login again', 401)
    );

  // Storing the user into the request
  req.user = currentUser;
  next();
});

// Setting restrictions to the users, ... turning the argument in an array
exports.restrictTo = (...roles) => {
  // Returning the express method
  return (req, res, next) => {
    // when adding protection we added the user into the req.user, in this way we can get it back
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          'You do not have enough permission to perform this action',
          403
        )
      );
    // calling the next middleware
    next();
  };
};
