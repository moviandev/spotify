const express = require('express');
const albumController = require('../controller/albunsController');
const auth = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(albumController.getAllAlbuns)
  .post(auth.validate, albumController.createAlbum);

router
  .route('/:id')
  .get(albumController.getAlbum)
  .patch(auth.validate, albumController.updateAlbum)
  .delete(auth.validate, albumController.deleteAlbum);

module.exports = router;
