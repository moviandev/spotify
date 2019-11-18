const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const catchHandler = require('../utils/catchHandler');
const AppError = require('../utils/AppError');

exports.signup = catchHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    confirmPass: req.body.confirmPass
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  res.status(201).json({
    status: 'created',
    token,
    user
  });
});

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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  res.status(200).json({
    status: 'Logged',
    token,
    user
  });
});
