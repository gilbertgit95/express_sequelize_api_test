const express = require('express');
const { sequelize } = require('./../models');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('get data')
})

router.post('/', (req, res) => {
    res.send('modify data')
})

router.put('/', (req, res) => {
    res.send('add data')
})

router.delete('/', (req, res) => {
    res.send('delete data')
})

module.exports = router;