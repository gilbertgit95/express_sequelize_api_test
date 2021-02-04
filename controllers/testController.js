const express = require('express');
const textService = require('../services/testService');
const encryption = require('../services/encryption');
const jwt = require('../services/token');

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

    const hashed = await encryption.generate('betwo')
    const isEqual = await encryption.verify('betwo', hashed)

    const jwt1 = jwt.generate({user: 'johan'})
    await textService.delay(2)
    const jwt2 = jwt.generate({user: 'johan'})
    try {
        const jwtdata = await jwt.verify(jwt1)

        return res.json({
            encryption: `hash is: ${ hashed }, and is isEqual value is: ${ isEqual }`,
            jwt: `jwt1: ${ jwt1 } and jwt2: ${ jwt2 } isEqual: ${ jwt1 == jwt2 }`,
            jwtdata
        })
    } catch (err) {
        return res.status(500).json(err)
    }
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