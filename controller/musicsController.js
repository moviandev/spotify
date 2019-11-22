const APIFeatures = require('../utils/APIFeatures');
const Music = require('../models/musicsModel');
const Album = require('../models/albunsModel');
const catchHandler = require('../utils/catchHandler');
const AppError = require('../utils/AppError');

exports.getAllMusics = catchHandler(async (req, res, next) => {
  const feats = new APIFeatures(Music.find(), req.query).sort();

  const musics = await feats.query;

  res.status(200).json({
    status: 'success',
    data: {
      musics
    }
  });
});

exports.createMusic = catchHandler(async (req, res, next) => {
  const album = await Album.findOne({
    title: req.body.albumName
  });

  const reqBody = {
    title: req.body.title,
    albumName: req.body.albumName,
    albumID: album._id
  };

  if (!album)
    return next(new AppError('Album Name was not find, please try again', 404));

  const musics = new Music(reqBody);

  await musics.save();

  album.music.push(musics);

  await album.save();

  res.status(201).json({
    status: 'created',
    data: {
      musics
    }
  });
});

exports.getMusic = catchHandler(async (req, res, next) => {
  const music = await Music.findById(req.params.id).populate('album');

  if (!music)
    return next(new AppError(`Could not find ${req.originalUrl}`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      music
    }
  });
});

exports.deleteMusic = catchHandler(async (req, res, next) => {
  const music = await Music.findByIdAndDelete(req.params.id);

  if (!music) return next(new AppError(`Could not delete ${req.params.id}`));

  res.status(204).json({
    status: 'deleted'
  });
});
