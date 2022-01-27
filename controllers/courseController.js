

const {Course} = require('../models')
const getYoutube = require('../helpers/getYoutube')

class Controller{

    static findAllCourses(req, res){
        Course.findAll()
        .then(data =>{
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