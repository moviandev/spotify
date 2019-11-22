const express = require('express');
const albumController = require('../controller/albunsController');
const auth = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(albumController.getAllAlbuns)
  .post(
    auth.protected,
    auth.restrictTo('admin', 'producer'),
    albumController.createAlbum
  );

router
  .route('/:id')
  .get(albumController.getAlbum)
  .patch(
    auth.protected,
    auth.restrictTo('admin', 'artist', 'producer'),
    albumController.updateAlbum
  )
  .delete(
    auth.protected,
    auth.restrictTo('admin', 'artist', 'producer'),
    albumController.deleteAlbum
  );

module.exports = router;
