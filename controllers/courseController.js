

const { Course, Category, User } = require('../models')
const getYoutube = require('../helpers/getYoutube')

const { Op } = require('sequelize')
const user = require('../models/user')

class Controller {

    static findAllCourses(req, res) {
        let options = { include: Category }

        if (req.query.name) {
            options.where = {}
            options.where.name = {
                [Op.iLike]: `${req.query.name}%`
            }

        }
        let userData
        console.log(req.query.applyCourse)
        User.findByPk(req.session.userId)
            .then(data => {
              
                return User.update({ CourseId: req.query.applyCourse }, {
                    where: {
                        id: req.session.userId
                    }
                  
                })
            })
            .then(data => {
               
                return Course.findAll(options)
            })
            .then(data => {
               
                console.log(req.session.role)
                let Role = req.session.role
                let CourseId = req.session.courseId
                console.log(CourseId)
                res.render('landing', { data, Role, CourseId })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static doCourse(req, res) {
        let id = req.params.id

        Course.findByPk(id)
            .then(data => {
                let link = getYoutube
                res.render('course', { data: data, link: link })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static createCourse(req, res) {
        Category.findAll()
            .then(data => {
                res.render('addCourse', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static courseDelete(req, res) {
        console.log(req.params.id)
        Course.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(_ => {
                res.redirect('/courses')
            })
            .catch(err => {
                res.send(err)
            })
    }


}


module.exports = Controller