const express = require('express');

const usersController = require('./usersController');

const router = express.Router();

router.use('/v1/users', usersController)

module.exports = router;