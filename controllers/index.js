const express = require('express');

const usersController = require('./usersController');
const usersProfileController = require('./usersProfileController');

const router = express.Router();

router.use('/v1/users', usersController)
router.use('/v1/users-profile', usersProfileController)

module.exports = router;