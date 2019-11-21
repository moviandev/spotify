const User = require('../models/usersModel');
const AppError = require('../utils/AppError');
const catchHandler = require('../utils/catchHandler');

exports.getAllUsers = catchHandler(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: 'success',
    result: user.length,
    user
  });
});

exports.createUser = catchHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'created',
    user
  });
});

exports.getUser = catchHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(new AppError('User was not found, please try again', 404));

  res.status(200).json({
    status: 'success',
    user
  });
});

exports.updateUser = catchHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user)
    return next(new AppError('User was not found, please try again', 404));

  res.status(200).json({
    status: 'up-to-date',
    user
  });
});

exports.deleteUser = catchHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return next(new AppError('User was not found, please try again', 404));

  res.status(204).json({
    status: 'deleted',
    user
  });
});
