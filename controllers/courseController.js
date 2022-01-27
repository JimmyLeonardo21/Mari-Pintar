

const {Course} = require('../models')

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
            res.render('course', {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }


}


module.exports = Controller