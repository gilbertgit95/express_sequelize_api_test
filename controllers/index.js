const express = require('express');

const testController = require('./testController');
const usersController = require('./usersController');
const usersProfileController = require('./usersProfileController');

const router = express.Router();

router.use('/v1/test', testController)
router.use('/v1/users', usersController)
router.use('/v1/users-profile', usersProfileController)

module.exports = router;