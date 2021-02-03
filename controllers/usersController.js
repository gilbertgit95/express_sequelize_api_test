const express = require('express');
const userprofile = require('../models/userprofile');
const { sequelize, User } = require('./../models');

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

    // generate selector
    let selector = {}
    if (username) selector['username'] = username
    if (uuid)     selector['uuid'] = uuid
    if (email)    selector['email'] = email
    if (role)     selector['role'] = role

    // generate limit
    pagesize = pagesize? parseInt(pagesize): DEFAULT_PAGESIZE

    // generate skip
    pagenumber = pagenumber? parseInt(pagenumber): DEFAULT_PAGENUMBER
    let skip = (pagenumber - 1) * pagesize

    try {
        const result = await User.findAll({
            include: ['userProfile'],
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
        password,
        username,
        email,
        role,
    } = req.body

    const user = await User.findOne({ selector: {uuid: userUuid} })

    if (user) {
        user.password = password
        user.username = username
        user.email = email
        user.role = role

        try {
            const result = await user.save()
            res.json(result)
        } catch (e) {
            return res.status(500).json(e)
        }
    } else {
        return res.status(500).json({message: 'User not existed'})
    }
})

router.put('/', async (req, res) => {
    const {
        password,
        username,
        email,
        role,

        userUuid
    } = req.body
    
    const user = await User.findOne({ selector: {uuid: userUuid} })

    try {
        const result = await User.create({
            password,
            username,
            email,
            role
        })

        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

router.delete('/', async (req, res) => {
    const {userUuid} = req.body
    
    const user = await User.findOne({ selector: {uuid: userUuid} })

    if (user) {
        try {
            await user.destroy()
            res.json({message: 'User deleted'})
        } catch (e) {
            return res.status(500).json(e)
        }
    } else {
        return res.status(500).json({message: 'User not existed'})
    }
})

module.exports = router;