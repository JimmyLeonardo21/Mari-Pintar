

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
        // let userData
        // console.log(req.query.applyCourse, '>>>>>>>>>>')
        if(req.query.applyCourse){
            User.update({ CourseId: +req.query.applyCourse }, {
                where: {
                    id: +req.session.userId
                }
              
            })
            .then(() => {
                req.session.courseId = +req.query.applyCourse
                res.redirect('/courses')
            })
            .catch((err) => {
                res.send(err)
            })
        }else {
            Course.findAll(options)
            .then(data => {
                const Role = req.session.role
                const CourseId = req.session.courseId
                res.render('landing', { data, Role, CourseId })
            })
            .catch(err => {
                res.send(err)
            })
        }
        // User.findByPk(req.session.userId)
        //     .then(data => {
              
        //         return User.update({ CourseId: req.query.applyCourse }, {
        //             where: {
        //                 id: req.session.userId
        //             }
                  
        //         })
        //     })
        //     .then(data => {
        //         return Course.findAll(options)
        //     })
        //     .then(data => {
        //         const Role = req.session.role
        //         const CourseId = req.session.courseId
        //         res.render('landing', { data, Role, CourseId })
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
    }
    static doCourse(req, res) {
        const id = req.params.id

        Course.findByPk(+id, {include: Category})
            .then(data => {
                const link = getYoutube
                // console.log(Course.dateFormat, data)
                // const getDate = data.dateFormat(data.createdAt)
                res.render('course', { data: data, Category:Category, link: link, getDate: Course.dateFormat})
            })
            .catch(err => {
                console.log(err, 'MASSSSSUKKKKK')
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