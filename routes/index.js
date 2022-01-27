const express = require('express')
const router = express.Router()
const courseRoute = require('./course')
const user = require('./user')


router.use('/user', user)
router.get('/', (req, res) => {
    res.render('landingPage')
  })
router.use('/courses', courseRoute)


module.exports = router