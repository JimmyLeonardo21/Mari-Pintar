const { User, Profile } = require("../models")
const bcrypt = require('bcryptjs');


class Controller {
    static getLogin(req, res) {
        res.render('login')
    }
    static getRegister(req, res) {
        res.render("register")
    }
    static postRegister(req, res) {
        const { name, address, email, password, gender } = req.body
        User.create({
            username: name,
            password

        })
            .then(data => {
                res.redirect("/user")
                return Profile.create({
                    name,
                    address,
                    email,
                    gender,
                    UserId: data.id
                })
            })
            .then(_ => {
                res.redirect("/user")
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    let errors = []
                    err.errors.map(el => {
                        errors.push(el.message)
                    })
                    res.redirect(`/user/register?error=${errors}`)
                }
                else {
                    res.send(err)
                }

            })
    }
    static postLogin(req, res) {
        console.log(req.body, "><><><><><><<>");
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (user) {
                    const isValidatPassword = bcrypt.compareSync(password, user.password)
                    if (isValidatPassword) {
                        return res.redirect("/courses")
                    } else {
                        const error = "invalid username or password"
                        return res.redirect(`/user?error=${error}`)
                    }
                }
            })
    }
}

module.exports = Controller