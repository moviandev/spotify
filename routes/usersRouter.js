const express = require('express');
const auth = require('../controller/authController');
const userController = require('../controller/usersController');

const router = express.Router();

router.route('/signup').post(auth.signup);
router.route('/login').post(auth.login);

router
  .route('/')
  .get(auth.protected, auth.restrictTo('admin'), userController.getAllUsers)
  .post(auth.protected, auth.restrictTo('admin'), userController.createUser);

router
  .route('/:id')
  .get(auth.protected, userController.getUser)
  .patch(auth.protected, userController.updateUser)
  .delete(auth.protected, auth.restrictTo('admin'), userController.deleteUser);

module.exports = router;
