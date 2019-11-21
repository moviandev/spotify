const express = require('express');
const auth = require('../controller/authController');
const userController = require('../controller/usersController');

const router = express.Router();

router.route('/signup').post(auth.signup);
router.route('/login').post(auth.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
