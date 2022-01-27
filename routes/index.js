const express = require('express')
const router = express.Router()
const courseRoute = require('./course')

router.get('/', (req, res) => {
    res.send('test')
  })
router.use('/courses', courseRoute)


module.exports = router