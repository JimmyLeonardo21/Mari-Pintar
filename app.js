const express = require('express')
const app = express()
const router = require('./routes/index')
const session = require('express-session')
const port = process.env.PORT || 3000
console.log(process.env.PORT)

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
   }
}))
app.use('/', router)

router.use(function (req, res, next) {
  console.log(req.session, "<><><><>ini yg di app<>");
  console.log('Time:', Date.now())
  next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})