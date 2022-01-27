

const {Course, Category} = require('../models')
const getYoutube = require('../helpers/getYoutube')
const user = require('../models/user')
const { Op } = require('sequelize')

class Controller{

    static findAllCourses(req, res){
        let options = {include : Category}
        if (req.query){
            console.log(req.query)
            options.where = {}
            if (req.query.name) {
                options.where.name = {
                    [Op.iLike]: `${req.query.name}%`
                }

            }
        }
        Course.findAll(options)
        .then(data =>{
        data.forEach(el =>{
            console.log(el.Category.name)
        })
            res.render('landing', {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static doCourse(req, res){
        let id = req.params.id
       
        Course.findByPk(id)
        .then(data =>{
            let link = getYoutube
            res.render('course', {data: data, link:link})
        })
        .catch(err =>{
            res.send(err)
        })
    }


}


module.exports = Controller