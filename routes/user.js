const express = require('express')
const { route } = require('.')
const Controller = require('../controllers/userController')
const router = express.Router()


// const session = require('express-session')
// router.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       sameSite: true
//      }
//   }))


router.get('/', Controller.getLogin)
router.post('/', Controller.postLogin)
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)

router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
  })


module.exports = router