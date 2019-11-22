const express = require('express');
const auth = require('../controller/authController');
const music = require('../controller/musicsController');

const router = express.Router();

/* 
  MIDDLEWARE CONVENTION, all the protected route have in its request the auth protected first
*/

router
  .route('/')
  .get(music.getAllMusics)
  .post(
    auth.protected,
    auth.restrictTo('admin', 'producer'),
    music.createMusic
  );

router
  .route('/:id')
  .get(music.getMusic)
  .delete(
    auth.protected,
    auth.restrictTo('admin', 'artist', 'producer'),
    music.deleteMusic
  );

module.exports = router;
