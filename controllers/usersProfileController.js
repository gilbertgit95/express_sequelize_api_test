const express = require('express');
const { sequelize, UserProfile, User } = require('./../models');

const router = express.Router();

const DEFAULT_PAGESIZE = 100
const DEFAULT_PAGENUMBER = 1

router.get('/', async (req, res) => {
    let {
        firstname,
        middlename,
        lastname,
        mobile,
        gender,
        birthday,

        pagesize,
        pagenumber
    } = req.query

    // generate selector
    let selector = {}
    if (firstname)  selector['firstname'] = firstname
    if (middlename) selector['middlename'] = middlename
    if (lastname)   selector['lastname'] = lastname
    if (mobile)     selector['mobile'] = mobile
    if (gender)     selector['gender'] = gender
    if (birthday)   selector['birthday'] = birthday

    // generate limit
    pagesize = pagesize? parseInt(pagesize): DEFAULT_PAGESIZE

    // generate skip
    pagenumber = pagenumber? parseInt(pagenumber): DEFAULT_PAGENUMBER
    let skip = (pagenumber - 1) * pagesize

    try {
        const result = await UserProfile.findAll({
            include: ['user'],
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
        firstname,
        middlename,
        lastname,
        mobile,
        gender,
        birthday,
    } = req.body

    res.send('modify data')
})

router.put('/', async (req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        mobile,
        gender,
        birthday,

        userUuid
    } = req.body

    try {
        const user = await User.findOne({where: {uuid: userUuid}})

        if (!user) throw({message: 'user doesnt exist'})

        const result = await UserProfile.create({
            userId: user.id,
            firstname,
            middlename,
            lastname,
            mobile,
            gender,
            birthday,
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