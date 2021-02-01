const express = require('express');
const { sequelize, User } = require('./../models');

const router = express.Router();

const DEFAULT_PAGESIZE = 100
const DEFAULT_PAGENUMBER = 1

router.get('/', async (req, res) => {
    let {
        username,
        email,
        role,
        firstname,
        lastname,
        middlename,

        pagesize,
        pagenumber
    } = req.query

    // generate selector
    let selector = {}
    if (username)   selector['username'] = username
    if (email)      selector['email'] = email
    if (role)       selector['role'] = role
    if (firstname)  selector['firstname'] = firstname
    if (lastname)   selector['lastname'] = lastname
    if (middlename) selector['middlename'] = middlename

    // generate limit
    pagesize = pagesize? parseInt(pagesize): DEFAULT_PAGESIZE

    // generate skip
    pagenumber = pagenumber? parseInt(pagenumber): DEFAULT_PAGENUMBER
    let skip = (pagenumber - 1) * pagenumber

    try {
        const result = await User.findAll({
            where: selector,
            limit: pagesize,
            skip: skip
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const {
        username,
        email,
        role,
        firstname,
        lastname,
        middlename
    } = req.body

    res.send('modify data')
})

router.put('/', async (req, res) => {
    const {
        username,
        email,
        role,
        firstname,
        lastname,
        middlename
    } = req.body

    try {
        const result = await User.create({
            username,
            email,
            role,
            firstname,
            lastname,
            middlename
        })

        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

router.delete('/', async (req, res) => {
    res.send('delete data')
})

module.exports = router;