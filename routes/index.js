const express = require('express')
const router = express.Router()
const courseRoute = require('./course')
const user = require('./user')
router.use('/user', user)
router.get('/', (req, res) => {
    res.send('test')
  })
router.use('/courses', courseRoute)


module.exports = router