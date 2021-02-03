const express = require('express');
const encryption = require('../services/encryption');
const ecryption = require('../services/encryption')

const router = express.Router();

const DEFAULT_PAGESIZE = 100
const DEFAULT_PAGENUMBER = 1

router.get('/', async (req, res) => {
    let {
        username,
        email,
        role,
        uuid,

        pagesize,
        pagenumber
    } = req.query

    const hashed = await encryption.hash('betwo')
    const isEqual = await encryption.compare('betwo', hashed)
    res.json({message: `hash is: ${ hashed }, and is isEqual value is: ${ isEqual }`})
})

router.post('/', async (req, res) => {
    const {
        password,
        username,
        email,
        role,
    } = req.body
})

router.put('/', async (req, res) => {
    const {
        password,
        username,
        email,
        role,

        userUuid
    } = req.body
})

router.delete('/', async (req, res) => {
    const {userUuid} = req.body
})

module.exports = router;