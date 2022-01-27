

const {Course} = require('../models')

class Controller{

    static findAllCourses(req, res){
        Course.findAll()
        .then(data =>{
            res.render('courses', {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }


}


module.exports = Controller