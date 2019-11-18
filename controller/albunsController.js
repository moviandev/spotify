const Album = require('../models/albunsModel');
const catchHandler = require('../utils/catchHandler');
const AppError = require('../utils/AppError');

exports.getAllAlbuns = catchHandler(async (req, res, next) => {
  const album = await Album.find().populate('music');

  res.status(200).json({
    status: 'success',
    album
  });
});

exports.createAlbum = catchHandler(async (req, res, next) => {
  const album = new Album(req.body);
  await album.save();

  res.status(201).json({
    status: 'success',
    album
  });
});

exports.getAlbum = catchHandler(async (req, res, next) => {
  const album = await Album.findById(req.params.id);

  if (!album)
    return next(new AppError('Album was not find, please try again', 404));

  res.status(200).json({
    status: 'success',
    album
  });
});

exports.updateAlbum = catchHandler(async (req, res, next) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body);

  if (!album)
    return next(new AppError('Album was not find, please try again', 404));

  res.status(200).json({
    status: 'success',
    album
  });
});

exports.deleteAlbum = catchHandler(async (req, res, next) => {
  const album = await Album.findByIdAndDelete(req.params.id);

  if (!album)
    return next(new AppError('Album was not find, please try again', 404));

  res.status(204).json({
    status: 'success'
  });
});
