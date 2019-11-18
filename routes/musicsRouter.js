const express = require('express');
const music = require('../controller/musicsController');

const router = express.Router();

router
  .route('/')
  .get(music.getAllMusics)
  .post(music.createMusic);

router
  .route('/:id')
  .get(music.getMusic)
  .delete(music.deleteMusic);

module.exports = router;
