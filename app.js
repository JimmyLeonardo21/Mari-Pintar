const express = require('express')
const app = express()
const router = require('./routes/index')
const session = require('express-session')
const port = 3000

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

/*
sequelize-cli model:generate --name Category --attributes name:string
sequelize-cli model:generate --name Course --attributes name:string,description:string,duration:integer,videoUrl:string,CategoryId:integer
sequelize-cli model:generate --name User --attributes username:string,password:string,CourseId:integer
sequelize-cli model:generate --name Profile --attributes name:string,email:string,gender:string,address:string,UserId:integer
*/