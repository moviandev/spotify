const express = require('express');
const auth = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(auth.signup);
router.route('/login').post(auth.login);

module.exports = router;
