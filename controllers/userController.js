const {User, Profile} = require("../models")
const bcrypt = require('bcryptjs');


class Controller {
    static getLogin (req, res){
        const {error, sessionError} = req.query
        res.render('login', {error, sessionError})
    }
    static getRegister(req, res){
        res.render("register")
    }
    static postRegister(req, res){
        console.log(req.body);
        const {name, address, email, password, gender} = req.body
        User.create({
            username : email,
            password
            
        })
        .then(data=> {
            res.redirect("/user")
            return Profile.create({
                name,
                address,
                email,
                gender,
                UserId: data.id
            })
        })
        .then(_=> {
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
    static postLogin(req, res){
        const {email, password} = req.body
        User.findOne({
            where: {
                username : email
                
            }
        })   
        .then(user => {
            if (user) {           
                const isValidatPassword = bcrypt.compareSync(password, user.password)
                if (isValidatPassword) {
                    req.session.userId = user.id
                    req.session.courseId = user.CourseId
                    req.session.role = user.Role
                    
                    return res.redirect("/courses")
                } else {
                    const error = "invalid email or password"
                    return res.redirect(`/user?error=${error}`)
                }
            }else {
                const error = "invalid email or password"
                return res.redirect(`/user?error=${error}`)
            }
        })
        .catch(err => {
            res.send(err)
        }) 
    }
    static getLogout (req, res) {
        req.session.destroy((err => {
            if (err) {
                res.send(err)
                
            } else {
                res.redirect("/")
            }
        }))
    }
    
}

module.exports= Controller