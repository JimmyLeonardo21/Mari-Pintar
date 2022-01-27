const express = require('express')
const Controller = require('../controllers/userController')
const router = express.Router()

router.get('/', Controller.getLogin)
router.post('/', Controller.postLogin)
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)



module.exports = router