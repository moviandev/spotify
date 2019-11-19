const express = require('express');
const auth = require('../controller/authController');
const music = require('../controller/musicsController');

const router = express.Router();

router
  .route('/')
  .get(music.getAllMusics)
  .post(auth.validate, music.createMusic);

router
  .route('/:id')
  .get(music.getMusic)
  .delete(auth.validate, music.deleteMusic);

module.exports = router;
