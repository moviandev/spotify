const express = require('express');
const albumController = require('../controller/albunsController');

const router = express.Router();

router
  .route('/')
  .get(albumController.getAllAlbuns)
  .post(albumController.createAlbum);

router
  .route('/:id')
  .get(albumController.getAlbum)
  .patch(albumController.updateAlbum)
  .delete(albumController.deleteAlbum);

module.exports = router;
